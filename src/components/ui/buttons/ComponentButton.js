import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';
import theme from '../../../styles/Theme';

/**
 * Button that displays the current component name and opens the component tree
 * Used in navigation to show and select different system components
 *
 * @param {string} componentName - Name of the current component being viewed
 * @param {function} onClick - Handler for when the folder icon is clicked
 */
const ComponentButton = ({ componentName = 'Root Component', onClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        // Use typography from theme
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          color: theme.palette.primary.main,
          transition: 'color 0.2s ease',
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.accent.main,
          },
        }}
        aria-label="Open component tree"
      >
        <FolderOpen />
      </IconButton>
      <Typography
        variant="appLabel"
        sx={{
          color: theme.palette.primary.main,
          // Explicitly use theme typography
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {componentName}
      </Typography>
    </Box>
  );
};

ComponentButton.propTypes = {
  componentName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ComponentButton;
