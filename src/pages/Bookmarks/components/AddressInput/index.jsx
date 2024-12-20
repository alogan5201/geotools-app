/* eslint-disable jsx-a11y/no-autofocus */
import Grid from '@mui/material/Grid';
import Input from 'components/Input';
import { useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import useStore from 'store/mapStore';

// @mui icons
import SearchIcon from '@mui/icons-material/Search';

function AddressInput(props) {
  // Create a ref to the input element
  const inputRef = useRef(null);

  // Function to set focus to input element
  const focusInput = () => {
    // Use the ref to focus the input element
    inputRef.current.focus();
  };
  const setMapInputState = useStore((state) => state.setMapInputState);
  function handleChange(e) {
    let val = e.target.value;
    focusInput();
    if (val.length === 0 && props.readOnly === false) {
      setMapInputState(true);
    }
  }
  useEffect(() => {
    focusInput();
  }, [props]);
  return (
    <Grid item xs={12} pr={1} mb={3}>
      <Input
        autoFocus={true}
        ref={inputRef}
        onChange={handleChange}
        fullWidth
        type="text"
        defaultValue="Atlanta, GA"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <SearchIcon fontSize="medium" color="info" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

export default AddressInput;
