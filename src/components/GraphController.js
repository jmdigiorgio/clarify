import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import PropTypes from 'prop-types';
import GraphViewport from './GraphViewport';
import { Box, IconButton, Paper, Typography, Collapse } from '@mui/material';
import { AddBox, ExpandLess, ExpandMore } from '@mui/icons-material';

const getNodeDefaults = () => ({
  style: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    minWidth: '150px',
    textAlign: 'center',
  },
  // No sourcePosition or targetPosition - handles will be on both sides
});

const GraphController = ({ backendNodes }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isControlExpanded, setIsControlExpanded] = useState(false);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            markerEnd: { type: 'arrow', color: '#0c0a09' },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  useEffect(() => {
    if (backendNodes.length > 0) {
      const transformedNodes = backendNodes.map((node, index) => ({
        id: node.id,
        position: { x: 400 + index * 200, y: 250 },
        data: {
          label: node.properties.name || 'New Node',
          properties: node.properties,
        },
        ...getNodeDefaults(),
      }));
      setNodes(transformedNodes);
    }
  }, [backendNodes, setNodes]);

  const addNewNode = () => {
    const newNode = {
      id: `node_${nodeIdCounter}`,
      position: { x: 400, y: 300 },
      data: {
        label: 'New Node',
        properties: {},
      },
      ...getNodeDefaults(),
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((prev) => prev + 1);
  };

  return (
    <Box sx={{ position: 'relative', height: 'calc(100vh - 180px)' }}>
      <GraphViewport
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />

      <Paper
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          bgcolor: 'primary.main',
          border: 1,
          borderColor: 'secondary.main',
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
            Controls
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
              onClick={addNewNode}
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
    </Box>
  );
};

GraphController.propTypes = {
  backendNodes: PropTypes.array.isRequired,
};

export default GraphController;
