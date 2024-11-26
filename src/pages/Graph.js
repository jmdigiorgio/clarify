import React from 'react';
import { Box } from '@mui/material';
import { useNodesState, useEdgesState, addEdge, ReactFlowProvider } from 'reactflow';
import GraphDisplay from '../components/graph/GraphDisplay';
import CustomNode from '../components/graph/GraphNode';

/**
 * Graph page component
 * Manages graph state and provides data/callbacks to GraphDisplay
 */
const Graph = () => {
  // Define custom node types
  const nodeTypes = {
    custom: CustomNode,
  };

  // Sample initial data - we'll load this from the API later
  const initialNodes = [
    {
      id: '1',
      type: 'custom', // Use our custom node type
      position: { x: 100, y: 100 },
      data: { label: 'Test Node 1' },
    },
    {
      id: '2',
      type: 'custom', // Use our custom node type
      position: { x: 300, y: 100 },
      data: { label: 'Test Node 2' },
    },
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = React.useCallback(
    (params) => {
      setEdges((prevEdges) =>
        addEdge(
          {
            ...params,
            type: 'default',
            animated: false,
          },
          prevEdges
        )
      );
    },
    [setEdges]
  );

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100%',
        mt: 8,
        bgcolor: 'background.default',
      }}
    >
      <ReactFlowProvider>
        <GraphDisplay
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </ReactFlowProvider>
    </Box>
  );
};

export default Graph;
