import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import PropTypes from 'prop-types';

// Import required ReactFlow styles
import 'reactflow/dist/style.css';

/**
 * GraphDisplay - Core graph visualization component
 *
 * Renders the main canvas where the graph is displayed using ReactFlow.
 * Handles basic graph display functionality like nodes, edges, viewport.
 * More complex interactions are handled by parent components.
 */
const GraphDisplay = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes }) => {
  const graphStyles = {
    width: '100%',
    height: '100%',
  };

  const defaultViewport = { x: 0, y: 0, zoom: 1 };

  return (
    <div style={graphStyles}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        fitView
        nodeOrigin={[0.5, 0.5]}
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
        }}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background gap={12} size={1} variant="dots" />
        <Controls position="bottom-right" />
        <MiniMap position="bottom-left" />
      </ReactFlow>
    </div>
  );
};

GraphDisplay.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNodesChange: PropTypes.func.isRequired,
  onEdgesChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  nodeTypes: PropTypes.object,
};

GraphDisplay.defaultProps = {
  nodeTypes: {},
};

export default GraphDisplay;
