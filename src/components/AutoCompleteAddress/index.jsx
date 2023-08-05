/* eslint-disable jsx-a11y/no-autofocus */
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useStore from 'store/mapStore';
import { getCitiesStartWith, isCityCapital, reorderOrReplaceCityCapitalObjects } from 'util/geocoder';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';

export default function AutoCompleteAddress({ address, clear, submitOnSelect, onSubmit, icon, label, autoFocus }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const [overrideInput, setOverrideInput] = useState(false);
  //const queryLengths = [1, 3, 6, 9];
  //const [queryLengths] = useState([1, 3, 6, 9, 12]);
  const [capitalCities, setCapitalCities] = useState([]);
  const loading = open && options.length === 0;

  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: [],
      },
    },
  ];

  const handleInputFocus = () => {
  
    console.log("🚀 ~ handleInputFocus ~ overrideInput:", overrideInput)
    if (inputValue.length > 2 ) {
      setOpen(true);
    }
  };
  const handleChange = async (event, newValue) => {
    if (typeof newValue === 'string') {
      return;
    }

    /* const displayName = `${newValue.city}, ${newValue.state}`;
    setOverrideInput(true);
    setInputValue(displayName);
    const newValueData = { ...newValue, name: displayName };
    setOpen(false);
     */
    const displayName = `${newValue.city}, ${newValue.state}`;
    setInputValue(displayName);
    setValue(newValue); // Add this line
    setOverrideInput(false);
    const newValueData = { ...newValue, name: displayName };
    setOpen(false);
    //  const newQueryLengths = [1, 3, 6, 9, displayName.length];
    //setQueryLengths(newQueryLengths);
    // setOptions(newValue ? [newValue, ...options] : options);
    setOptions(options.filter((option) => option.id !== newValue.id));

    handleSubmit(newValueData, label);
  };
  const handleSubmit = (formattedValue, label) => {
    if (submitOnSelect) {
      onSubmit(formattedValue, label);
    } else {
      return;
    }
  };

  // ...

  useEffect(() => {
    let active;
    if (inputValue === '') {
      setMapInputState(true);
      return undefined;
    }
    if (inputValue.length > 2) {
      active = true;

      if (active) {
        (async function () {
          let newOptions = [];
          const results = await getCitiesStartWith(inputValue);

          if (results) {
            const capitalCity = isCityCapital(inputValue, capitalCities);
            if (capitalCity) {
              const uid = uuidv4();
              const displayName = `${capitalCity.city}, ${capitalCity.state}`;
              const newOption = { ...capitalCity, id: uid, name: displayName };
              const reorderedCities = reorderOrReplaceCityCapitalObjects(results, newOption);

              newOptions = [...newOptions, ...Object.values(reorderedCities)];
            } else {
              newOptions = Object.values(results).map((result) => ({
                ...result,
                name: `${result.city}, ${result.state}`,
              }));
            }

            setOptions(newOptions);
          }
        })();
      }
    }
    return () => {
      active = false;
    };
  }, [inputValue]);

  // ...

  useEffect(() => {
    if (address && label !== 'Destination') {
      const uid = uuidv4();
      const newInputValue = { name: address, id: uid };
      if (options.length > 0) {
        setOptions([newInputValue, ...options]);
      }
      setOverrideInput(true);
      setValue(newInputValue);
      //setOptions(newInputValue)
      //setInputValue(address)
      // setValue(newInputValue);
      
    }
  }, [address, label]);
  useEffect(() => {
    if (clear && clearMapInputs) {
      setOverrideInput(true);
      setValue('');
      setInputValue(''); // Clear input value here
    }
    setOverrideInput(false);
  }, [clear, clearMapInputs]);

  useEffect(() => {
    const loadCapitalCities = async () => {
      // This will only be downloaded when this code runs
      const arrayModule = await import('./capitalCities.js');
      setCapitalCities(arrayModule.default);
    };

    loadCapitalCities();
  }, []);

  return (
    <Autocomplete
      freeSolo
      blurOnSelect
      id="mapbox-autocomplete-demo"
      getOptionLabel={(option) => (option && option.name ? option.name : inputValue)}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      loadingText="..."
      autoComplete
      disableClearable
      PopperComponent={(props) => (
        <Popper
          id="autocomplete-dropdown"
          {...props}
          open={open}
          modifiers={modifiers}
          popperOptions={{
            placement: 'bottom',
          }}
          sx={{ marginTop: 10, padding: 0 }}
        />
      )}
      sx={{
        '& .MuiInputBase-root': { padding: 0.6, position: 'relative' },
        '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
      }}
      fullWidth
      filterSelectedOptions
      value={value}
      noOptionsText=""
      onChange={handleChange}
      onInputChange={(_, value) => {
        if (!overrideInput) {
          const isLengthLessThanThree = value.length < 3;
          const isOpenAndLengthLessThanThree = open && isLengthLessThanThree;
          const isNotOpenAndLengthGreaterThanThree = !open && !isLengthLessThanThree;
          if (isOpenAndLengthLessThanThree || isNotOpenAndLengthGreaterThanThree) {
            setOpen(!open);
          }
          setInputValue(value);
        }
        setOverrideInput(false);
      }}
      renderInput={(params) => (
        <TextField
          autoFocus={autoFocus ? autoFocus : false}
          size="small"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment position="end">
                  {loading ? (
                    <Box sx={{ marginTop: '7px', marginRight: '7px', opacity: 0.5 }}>
                      <ClipLoader color="#1A73E8" size={20} />
                    </Box>
                  ) : icon ? (
                    <Box sx={{ pr: 2 }}>{icon}</Box>
                  ) : (
                    <IconButton type="submit" sx={{ pr: 2 }}>
                      <SearchIcon fontSize="medium" color="info" />
                    </IconButton>
                  )}
                </InputAdornment>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
          onBlur={() => {
            setOpen(false);
          }}
          onFocus={handleInputFocus}
        />
      )}
      renderOption={(props, option, { index }) => {
        return (
          <li {...props} key={index}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{
                  width: 'calc(100% - 44px)',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                {option.name}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
