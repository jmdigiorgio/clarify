// GraphController.js
import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import PropTypes from 'prop-types';
import GraphViewport from './GraphViewport';
import CreateNodeDrawer from './CreateNodeDrawer';
import { Box, IconButton } from '@mui/material';
// Changed Add to AddBox for the square-style add icon
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';

const GraphController = ({ backendNodes, loading, error, onCreateNode, onFetchNodes }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const transformedNodes = backendNodes.map((node) => ({
      id: node.id,
      type: 'requirement',
      position: { x: 250, y: 250 },
      data: {
        label: node.properties.name || 'Unnamed',
        description: node.properties.description,
      },
    }));
    setNodes(transformedNodes);
  }, [backendNodes, setNodes]);

  useEffect(() => {
    onFetchNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ position: 'relative', height: 'calc(100vh - 180px)' }}>
      <GraphViewport
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        loading={loading}
        error={error}
      />

      {/* Updated control buttons container */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 1, // Adds spacing between buttons
          zIndex: 5,
        }}
      >
        {/* Add node button - now using AddBox icon */}
        <IconButton
          sx={{
            bgcolor: 'white',
            '&:hover': { bgcolor: '#d97706' },
          }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <AddBox />
        </IconButton>

        {/* Delete button - currently non-functional */}
        <IconButton
          sx={{
            bgcolor: 'white',
            '&:hover': { bgcolor: '#d97706' },
          }}
        >
          <IndeterminateCheckBox />
        </IconButton>
      </Box>

      <CreateNodeDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCreateNode={onCreateNode}
      />
    </Box>
  );
};

GraphController.propTypes = {
  backendNodes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onCreateNode: PropTypes.func.isRequired,
  onFetchNodes: PropTypes.func.isRequired,
};

export default GraphController;
