// CreateNodeDrawer.js
import React from 'react';
import { Drawer, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CreateNode from './CreateNode';

const DRAWER_WIDTH = 400;

const CreateNodeDrawer = ({ open, onClose, onCreateNode }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          p: 3,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Create New Node
      </Typography>

      <CreateNode onCreateNode={onCreateNode} onCancel={onClose} />
    </Drawer>
  );
};

CreateNodeDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateNode: PropTypes.func.isRequired,
};

export default CreateNodeDrawer;
