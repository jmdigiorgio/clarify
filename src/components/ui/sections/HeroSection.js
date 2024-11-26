import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const HeroSection = ({ heading, subheading }) => (
  <Box
    sx={{
      textAlign: 'center',
      mb: 12,
      mt: 8,
      bgcolor: 'background.default', // Using our new pure white color
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      gutterBottom
      sx={{
        color: 'secondary.main',
        fontWeight: 'bold',
      }}
    >
      {heading}
    </Typography>
    <Typography
      variant="h5"
      sx={{
        mb: 6,
        color: 'secondary.main',
        opacity: 0.8,
      }}
    >
      {subheading}
    </Typography>
  </Box>
);

HeroSection.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
};

export default HeroSection;
