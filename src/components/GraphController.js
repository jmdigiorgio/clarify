import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import PropTypes from 'prop-types';
import GraphViewport from './GraphViewport';
import CreateNodeDrawer from './CreateNodeDrawer';
import { Box, IconButton, Paper, Typography, Collapse } from '@mui/material';
import { AddBox, ExpandLess, ExpandMore } from '@mui/icons-material';

const GraphController = ({ backendNodes, loading, error, onCreateNode, onFetchNodes }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isControlExpanded, setIsControlExpanded] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const transformedNodes = backendNodes.map((node, index) => ({
      id: node.id,
      position: {
        x: 400 + index * 200,
        y: 250,
      },
      data: {
        label: node.properties.name || 'Unnamed',
        description: node.properties.description,
      },
      style: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
        minWidth: '150px',
        textAlign: 'center',
      },
      sourcePosition: 'bottom',
      targetPosition: 'top',
      type: 'default',
    }));
    setNodes(transformedNodes);
  }, [backendNodes, setNodes]);

  useEffect(() => {
    onFetchNodes();
  }, [onFetchNodes]);

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

      {/* Floating Control Box */}
      <Paper
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          bgcolor: 'primary.main',
          border: 1,
          borderColor: 'secondary.main', // Secondary color from our theme
          borderRadius: 1,
          overflow: 'hidden',
          minWidth: 100,
          zIndex: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            cursor: 'pointer',
          }}
          onClick={() => setIsControlExpanded(!isControlExpanded)}
        >
          <Typography
            sx={{
              flexGrow: 1,
              color: 'black',
              fontWeight: 'medium',
              textAlign: 'center',
            }}
          >
            Nodes
          </Typography>
          {isControlExpanded ? (
            <ExpandLess sx={{ color: 'black' }} />
          ) : (
            <ExpandMore sx={{ color: 'black' }} />
          )}
        </Box>

        <Collapse in={isControlExpanded}>
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <IconButton
              onClick={() => {
                setIsDrawerOpen(true);
                setIsControlExpanded(false);
              }}
              sx={{
                color: 'black',
                '&:hover': {
                  bgcolor: 'accent.main',
                },
              }}
            >
              <AddBox />
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
