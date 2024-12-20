// react-router components
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';
import Icon from '@mui/material/Icon';

import Box from 'components/Box';
import Typography from 'components/Typography';

function BackgroundBlogCard({ image, title, description, action }) {
  const cardActionStyles = {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',

    '& .material-icons, .material-icons-round,': {
      transform: `translateX(2px)`,
      transition: 'transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)',
    },

    '&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round': {
      transform: `translateX(6px)`,
    },
  };

  return (
    <Card
      sx={{
        backgroundImage: ({ palette: { black }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(rgba(black.main, 0.5), rgba(black.main, 0.5))}, url(${image})`,
        backgroundSize: 'cover',
      }}
    >
      <Box p={3}>
        <Box minHeight="20.625rem" my="auto" py={3}>
          <Typography
            variant="h2"
            color="white"
            mb={1}
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down('md')]: {
                fontSize: size['3xl'],
              },
            })}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="white" my={3}>
            {description}
          </Typography>
          {action.type === 'internal' ? (
            <Typography
              component={Link}
              to={action.route}
              variant="body2"
              fontWeight="regular"
              color="white"
              textTransform="capitalize"
              sx={cardActionStyles}
            >
              {action.label}
              <Icon sx={{ fontWeight: 'bold' }}>arrow_forward</Icon>
            </Typography>
          ) : (
            <Typography
              component={MuiLink}
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              fontWeight="regular"
              color="white"
              textTransform="capitalize"
              sx={cardActionStyles}
            >
              {action.label}
              <Icon sx={{ fontWeight: 'bold' }}>arrow_forward</Icon>
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the BackgroundBlogCard
BackgroundBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default BackgroundBlogCard;
