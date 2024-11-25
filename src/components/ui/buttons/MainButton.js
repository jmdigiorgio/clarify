import { Button } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * MainButton provides consistent styling for primary action buttons
 * Explicitly uses our theme system for colors and interactions
 */
const MainButton = ({ children, onClick, size = 'large' }) => (
  <Button
    variant="contained"
    size={size}
    onClick={onClick}
    sx={{
      bgcolor: 'primary.main',
      color: 'secondary.main',
      border: 1,
      borderColor: 'secondary.main',
      '&:hover': {
        bgcolor: 'accent.main',
        color: 'primary.main',
      },
    }}
  >
    {children}
  </Button>
);

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default MainButton;
