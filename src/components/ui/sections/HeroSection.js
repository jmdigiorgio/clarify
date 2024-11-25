import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * HeroSection displays a centered page heading with subtext
 * Strictly follows Theme.js styling
 */
const HeroSection = ({ heading, subheading }) => (
  <Box
    sx={{
      textAlign: 'center',
      mb: 12,
      mt: 8,
      bgcolor: 'primary.main',
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
