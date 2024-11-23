// GraphViewport.js
import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';
import 'reactflow/dist/base.css';
import 'reactflow/dist/style.css';

const GraphViewport = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  loading,
  error,
}) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 4,
          }}
        >
          <CircularProgress sx={{ color: '#d97706' }} />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 4,
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </div>
  );
};

GraphViewport.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  onNodesChange: PropTypes.func.isRequired,
  onEdgesChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default GraphViewport;
