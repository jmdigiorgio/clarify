import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * IconCard displays content in a card format with an icon, heading, and description
 * Follows our theme system for consistent styling
 */
const IconCard = ({ icon, heading, description }) => (
  <Paper
    sx={{
      p: 3,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      bgcolor: 'primary.main',
      border: 1,
      borderColor: 'secondary.main',
    }}
    elevation={2}
  >
    {icon}
    <Typography
      variant="h5"
      component="h2"
      sx={{
        mt: 2,
        mb: 1,
        color: 'secondary.main',
      }}
    >
      {heading}
    </Typography>
    <Typography sx={{ color: 'secondary.main' }}>{description}</Typography>
  </Paper>
);

IconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default IconCard;
