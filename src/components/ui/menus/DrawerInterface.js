import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Box } from '@mui/material';
import theme from '../../../styles/Theme';

/**
 * A reusable drawer interface component for menus and panels
 * Provides consistent styling, spacing, and behavior across the app
 *
 * @param {boolean} open - Controls drawer visibility
 * @param {function} onClose - Handler for when drawer should close
 * @param {string} [anchor='right'] - Drawer position
 * @param {node} children - Content to render inside drawer
 * @param {object} [sx] - Additional styles to apply to drawer paper
 * @param {object} [contentSx] - Additional styles to apply to content wrapper
 * @param {string} [width='400px'] - Drawer width (can be px, rem, etc)
 * @param {boolean} [noPadding=false] - Remove default padding if needed
 */
const DrawerInterface = ({
  open,
  onClose,
  anchor = 'right',
  children,
  sx = {},
  contentSx = {},
  width = '400px',
  noPadding = false,
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width,
          fontFamily: theme.typography.fontFamily,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          ...sx,
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          padding: noPadding ? 0 : 3,
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};

DrawerInterface.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  contentSx: PropTypes.object,
  width: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default DrawerInterface;
