import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';

const RequirementNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '3px',
        border: '1px solid #0c0a09',
        backgroundColor: 'white',
        minWidth: '150px',
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position={Position.LEFT}
        style={{
          background: '#0c0a09',
          width: '8px',
          height: '8px',
        }}
        isConnectable={true}
      />

      <div style={{ textAlign: 'center' }}>{data.label}</div>

      <Handle
        type="source"
        position={Position.RIGHT}
        style={{
          background: '#0c0a09',
          width: '8px',
          height: '8px',
        }}
        isConnectable={true}
      />
    </div>
  );
};

RequirementNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(RequirementNode);
