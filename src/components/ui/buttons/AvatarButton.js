import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from '@mui/material';
import theme from '../../../styles/Theme';

/**
 * A styled avatar button component that uses our global theme.
 * Used primarily for user profile actions in headers/navigation.
 *
 * @param {string} label - Tooltip text to display on hover
 * @param {string} initial - Single character to display in avatar
 * @param {function} onClick - Click handler function
 * @param {object} sx - Additional MUI sx styles to apply (will override defaults)
 */
const AvatarButton = ({ label = 'User Profile', initial = 'U', onClick, sx = {} }) => {
  return (
    <Tooltip title={label}>
      <Avatar
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          fontFamily: theme.typography.fontFamily,
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: theme.palette.accent.main,
          },
          ...sx,
        }}
      >
        {initial}
      </Avatar>
    </Tooltip>
  );
};

AvatarButton.propTypes = {
  label: PropTypes.string,
  initial: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default AvatarButton;
