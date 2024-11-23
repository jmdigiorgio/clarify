import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';

const DirectionalNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>{data?.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

DirectionalNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};

export default memo(DirectionalNode);
