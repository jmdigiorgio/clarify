import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import theme from '../../../styles/Theme';

/**
 * The main branding button used in navigation.
 * Links back to home page and maintains consistent styling.
 *
 * @param {string} [to='/'] - Route path to navigate to
 * @param {object} [sx] - Additional MUI styles to apply
 */
const ClarifyButton = ({ to = '/', sx = {} }) => {
  return (
    <Button
      component={RouterLink}
      to={to}
      sx={{
        color: theme.palette.primary.main,
        fontFamily: theme.typography.fontFamily,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: theme.palette.accent.main,
        },
        ...sx,
      }}
    >
      Clarify
    </Button>
  );
};

ClarifyButton.propTypes = {
  to: PropTypes.string,
  sx: PropTypes.object,
};

export default ClarifyButton;
