// CreateNode.js
import React, { useState } from 'react';
import { TextField, Button, Stack, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const CreateNode = ({ onCreateNode, onCancel }) => {
  const [nodeData, setNodeData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNodeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (!nodeData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      await onCreateNode(['Node'], nodeData);
      setNodeData({ name: '', description: '' });
      setError(null);
      onCancel();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Name"
        name="name"
        value={nodeData.name}
        onChange={handleInputChange}
        fullWidth
        required
      />

      <TextField
        label="Description"
        name="description"
        value={nodeData.description}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            bgcolor: 'primary.main',
            color: 'secondary.main',
            border: 1,
            borderColor: 'secondary.main',
            '&:hover': {
              bgcolor: 'accent.main',
              color: 'primary.main',
            },
          }}
        >
          Create
        </Button>
        <Button
          variant="contained"
          onClick={onCancel}
          sx={{
            bgcolor: 'primary.main',
            color: 'secondary.main',
            border: 1,
            borderColor: 'secondary.main',
            '&:hover': {
              bgcolor: 'accent.main',
              color: 'primary.main',
            },
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

CreateNode.propTypes = {
  onCreateNode: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateNode;
