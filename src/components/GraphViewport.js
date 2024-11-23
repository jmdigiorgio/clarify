import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import PropTypes from 'prop-types';
import 'reactflow/dist/base.css';
import 'reactflow/dist/style.css';

const GraphViewport = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <style>
        {`
          .react-flow__handle {
            opacity: 0;
          }
        `}
      </style>
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
    </div>
  );
};

GraphViewport.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  onNodesChange: PropTypes.func.isRequired,
  onEdgesChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
};

export default GraphViewport;
