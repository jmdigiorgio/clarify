import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Stack,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import api from '../services/Api';

const CreateNode = ({ onCreateNode, onCancel }) => {
  const [nodeTypes, setNodeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [properties, setProperties] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch node types on component mount
  useEffect(() => {
    const fetchNodeTypes = async () => {
      try {
        const types = await api.graph.getNodeTypes();
        setNodeTypes(types);
        setLoading(false);
      } catch (err) {
        setError('Failed to load node types');
        setLoading(false);
      }
    };
    fetchNodeTypes();
  }, []);

  // Reset properties when node type changes
  useEffect(() => {
    if (selectedType) {
      const type = nodeTypes.find((t) => t.id === selectedType);
      if (type) {
        // Initialize properties based on schema
        const initialProps = {};
        type.schema.forEach((field) => {
          initialProps[field.name] = '';
        });
        setProperties(initialProps);
      }
    } else {
      setProperties({});
    }
  }, [selectedType, nodeTypes]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setError(null);
  };

  const handlePropertyChange = (name, value) => {
    setProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateProperties = (type, props) => {
    const errors = [];
    type.schema.forEach((field) => {
      if (field.required && !props[field.name]) {
        errors.push(`${field.name} is required`);
      }
      // Add type validation based on field.type
      switch (field.type) {
        case 'number':
          if (props[field.name] && isNaN(props[field.name])) {
            errors.push(`${field.name} must be a number`);
          }
          break;
        case 'boolean':
          if (props[field.name] && !['true', 'false'].includes(props[field.name].toLowerCase())) {
            errors.push(`${field.name} must be true or false`);
          }
          break;
        case 'date':
          if (props[field.name] && isNaN(Date.parse(props[field.name]))) {
            errors.push(`${field.name} must be a valid date`);
          }
          break;
        case 'string':
          // String type doesn't need additional validation
          break;
        default:
          // For any unknown types, we'll treat them as strings
          break;
      }
    });
    return errors;
  };

  const handleCreate = async () => {
    if (!selectedType) {
      setError('Please select a node type');
      return;
    }

    const type = nodeTypes.find((t) => t.id === selectedType);
    if (!type) {
      setError('Invalid node type selected');
      return;
    }

    // Validate properties
    const validationErrors = validateProperties(type, properties);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
      await onCreateNode([type.name], properties);
      setSelectedType('');
      setProperties({});
      setError(null);
      onCancel();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading node types...</Typography>
      </Box>
    );
  }

  const selectedTypeData = nodeTypes.find((t) => t.id === selectedType);

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <FormControl fullWidth>
        <InputLabel>Node Type</InputLabel>
        <Select value={selectedType} onChange={handleTypeChange} label="Node Type">
          {nodeTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select the type of node to create</FormHelperText>
      </FormControl>

      {selectedTypeData && (
        <>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Properties
            </Typography>
          </Divider>

          {selectedTypeData.schema.map((field) => (
            <FormControl key={field.name} fullWidth>
              <TextField
                label={field.name}
                type={field.type === 'number' ? 'number' : 'text'}
                value={properties[field.name] || ''}
                onChange={(e) => handlePropertyChange(field.name, e.target.value)}
                required={field.required}
                error={field.required && !properties[field.name]}
                helperText={
                  field.required && !properties[field.name] ? 'This field is required' : ''
                }
              />
            </FormControl>
          ))}
        </>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={!selectedType}
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
