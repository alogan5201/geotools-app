import PropTypes from 'prop-types';

import Icon from '@mui/material/Icon';

import Box from 'components/Box';
import Typography from 'components/Typography';

function SimpleInfoCard({ color, icon, title, description, direction }) {
  let alignment = 'flex-start';

  if (direction === 'center') {
    alignment = 'center';
  } else if (direction === 'right') {
    alignment = 'flex-end';
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={alignment}
      textAlign={direction}
      p={direction === 'center' ? 2 : 0}
      lineHeight={1}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3rem"
        height="3rem"
        borderRadius="xl"
        variant="gradient"
        color="white"
        bgColor={color}
        coloredShadow={color}
      >
        {typeof icon === 'string' ? <Icon fontSize="small">{icon}</Icon> : icon}
      </Box>
      <Typography display="block" variant="5" fontWeight="bold" mt={2.5} mb={1.5}>
        {title}
      </Typography>
      <Typography display="block" variant="body2" color="text">
        {description}
      </Typography>
    </Box>
  );
}

// Setting default props for the SimpleInfoCard
SimpleInfoCard.defaultProps = {
  color: 'info',
  direction: 'left',
};

// Typechecking props for the SimpleInfoCard
SimpleInfoCard.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'center']),
};

export default SimpleInfoCard;
