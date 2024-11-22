import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  CircularProgress,
  Typography,
  Drawer,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import PropTypes from 'prop-types';
import RequirementNode from './RequirementNode';
import 'reactflow/dist/base.css';
import 'reactflow/dist/style.css';

// Creation drawer width
const DRAWER_WIDTH = 400;

// Define custom node types
const nodeTypes = {
  requirement: RequirementNode,
};

const GraphViewport = ({ nodes: backendNodes, loading, error, onCreateNode, onFetchNodes }) => {
  // ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    name: '',
    description: '',
  });
  const [creationError, setCreationError] = useState(null);

  // Handle edge connections
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Transform backend nodes to ReactFlow format
  const transformNodes = useCallback(() => {
    return backendNodes.map((node) => ({
      id: node.id,
      type: 'requirement',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        label: node.properties.name || 'Unnamed',
        description: node.properties.description,
      },
    }));
  }, [backendNodes]);

  // Update nodes when backend data changes
  useEffect(() => {
    if (backendNodes.length > 0) {
      setNodes(transformNodes());
    }
  }, [backendNodes, transformNodes, setNodes]);

  // Fetch nodes only once on mount
  useEffect(() => {
    onFetchNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNodeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle node creation
  const handleCreateNode = async () => {
    if (!newNodeData.name.trim()) {
      setCreationError('Name is required');
      return;
    }

    try {
      await onCreateNode(['Requirement'], newNodeData);
      setIsDrawerOpen(false);
      setNewNodeData({ name: '', description: '' });
      setCreationError(null);
    } catch (err) {
      setCreationError(err.message);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 180px)',
        bgcolor: '#fafaf9',
      }}
    >
      {loading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Background />
          <Controls
            position="bottom-right"
            style={{
              margin: '0 24px 24px 0',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <MiniMap style={{ margin: '24px' }} />
        </ReactFlow>
      )}

      <IconButton
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          bgcolor: 'white',
          '&:hover': { bgcolor: '#d97706' },
          zIndex: 5,
        }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <AddIcon />
      </IconButton>

      {/* Creation Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setCreationError(null);
          setNewNodeData({ name: '', description: '' });
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            p: 3,
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Create New Requirement
        </Typography>

        {creationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {creationError}
          </Alert>
        )}

        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={newNodeData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={newNodeData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleCreateNode}
              sx={{
                bgcolor: '#d97706',
                '&:hover': { bgcolor: '#92400e' },
              }}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsDrawerOpen(false);
                setCreationError(null);
                setNewNodeData({ name: '', description: '' });
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
};

GraphViewport.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      properties: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onCreateNode: PropTypes.func.isRequired,
  onFetchNodes: PropTypes.func.isRequired,
};

export default GraphViewport;
