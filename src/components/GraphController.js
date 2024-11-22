// GraphController.js
import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import PropTypes from 'prop-types';
import GraphViewport from './GraphViewport';
import CreateNodeDrawer from './CreateNodeDrawer';
import { Box, IconButton, Paper, Typography, Collapse } from '@mui/material';
import { Add, Remove, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const GraphController = ({ backendNodes, loading, error, onCreateNode, onFetchNodes }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const centerX = window.innerWidth / 2 - 85; // Center of viewport minus half node width
    const centerY = window.innerHeight / 2 - 60; // Center of viewport minus half node height
    const radius = 300; // Distance from center node to surrounding nodes

    const transformedNodes = backendNodes.map((node, index) => {
      if (index === 0) {
        // First node goes in the center
        return {
          id: node.id,
          type: 'requirement',
          position: { x: centerX, y: centerY },
          data: {
            label: node.properties.name || 'Unnamed',
            description: node.properties.description,
          },
        };
      } else {
        // Other nodes spread in a circle around the center
        const angle = ((index - 1) * (2 * Math.PI)) / (backendNodes.length - 1);
        return {
          id: node.id,
          type: 'requirement',
          position: {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          },
          data: {
            label: node.properties.name || 'Unnamed',
            description: node.properties.description,
          },
        };
      }
    });
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

      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          bgcolor: '#fafaf9',
          border: '2px solid #0c0a09',
          borderRadius: 1,
          width: '120px',
          zIndex: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            py: 0.5,
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: '#0c0a09',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Nodes
          </Typography>
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              right: 4,
              p: 0,
              color: '#0c0a09',
            }}
          >
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              p: 1,
            }}
          >
            <IconButton
              sx={{
                color: '#0c0a09',
                '&:hover': {
                  bgcolor: '#d97706',
                  color: '#fafaf9',
                },
              }}
              onClick={() => setIsDrawerOpen(true)}
              size="small"
            >
              <Add />
            </IconButton>

            <IconButton
              sx={{
                color: '#0c0a09',
                '&:hover': {
                  bgcolor: '#d97706',
                  color: '#fafaf9',
                },
              }}
              size="small"
            >
              <Remove />
            </IconButton>
          </Box>
        </Collapse>
      </Paper>

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
