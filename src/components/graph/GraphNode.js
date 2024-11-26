import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';
import theme from '../../styles/Theme';

/**
 * GraphNode - A node component with handles on both sides for connections
 * Uses styles defined in the global theme
 *
 * @param {Object} data - Node data containing label and other properties
 * @param {boolean} isConnectable - Whether the node can accept connections
 */
const GraphNode = ({ data, isConnectable }) => {
  const { node: nodeStyles } = theme.graph;

  // Get handle styles and add positioning
  const leftHandleStyle = {
    ...nodeStyles.handle,
    left: '-6px',
  };

  const rightHandleStyle = {
    ...nodeStyles.handle,
    right: '-6px',
  };

  return (
    <div style={nodeStyles.container}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={leftHandleStyle}
      />
      <div style={nodeStyles.label}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={rightHandleStyle}
      />
    </div>
  );
};

GraphNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  isConnectable: PropTypes.bool,
};

GraphNode.defaultProps = {
  isConnectable: true,
};

export default memo(GraphNode);
