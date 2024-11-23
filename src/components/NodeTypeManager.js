import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import api from '../services/Api';

// Schema field component for the dialog
const SchemaField = ({ field, onChange, onDelete }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
    <TextField
      size="small"
      label="Field Name"
      value={field.name}
      onChange={(e) => onChange({ ...field, name: e.target.value })}
    />
    <TextField
      size="small"
      select
      label="Type"
      value={field.type}
      onChange={(e) => onChange({ ...field, type: e.target.value })}
      SelectProps={{ native: true }}
    >
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
      <option value="date">Date</option>
    </TextField>
    <IconButton onClick={onDelete} sx={{ color: 'error.main' }}>
      <DeleteIcon />
    </IconButton>
  </Box>
);

// Prop types for SchemaField
SchemaField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const NodeTypeManager = () => {
  const [nodeTypes, setNodeTypes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [currentSchema, setCurrentSchema] = useState([]);
  const [typeName, setTypeName] = useState('');

  // Fetch existing node types
  const fetchNodeTypes = async () => {
    try {
      const types = await api.graph.getNodeTypes();
      setNodeTypes(types);
    } catch (error) {
      // Using a placeholder error handler until we implement proper error handling
      setNodeTypes([]);
    }
  };

  useEffect(() => {
    fetchNodeTypes();
  }, []);

  // Handle dialog operations
  const openDialog = (nodeType = null) => {
    if (nodeType) {
      setEditingType(nodeType);
      setTypeName(nodeType.name);
      setCurrentSchema(nodeType.schema);
    } else {
      setEditingType(null);
      setTypeName('');
      setCurrentSchema([]);
    }
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingType(null);
    setTypeName('');
    setCurrentSchema([]);
  };

  // Schema operations
  const addSchemaField = () => {
    setCurrentSchema([...currentSchema, { name: '', type: 'string', required: false }]);
  };

  const updateSchemaField = (index, updatedField) => {
    const newSchema = [...currentSchema];
    newSchema[index] = updatedField;
    setCurrentSchema(newSchema);
  };

  const deleteSchemaField = (index) => {
    setCurrentSchema(currentSchema.filter((_, i) => i !== index));
  };

  // Save node type
  const handleSave = async () => {
    const typeData = {
      name: typeName,
      schema: currentSchema,
    };

    try {
      if (editingType) {
        await api.graph.updateNodeType(editingType.id, typeData);
      } else {
        await api.graph.createNodeType(typeData);
      }
      fetchNodeTypes();
      closeDialog();
    } catch (error) {
      // Using a placeholder error handler until we implement proper error handling
      closeDialog();
    }
  };

  // Delete node type
  const handleDelete = async (id) => {
    try {
      await api.graph.deleteNodeType(id);
      fetchNodeTypes();
    } catch (error) {
      // Using a placeholder error handler until we implement proper error handling
      fetchNodeTypes();
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Node Types</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => openDialog()}
          sx={{
            color: 'secondary.main',
            '&:hover': { bgcolor: 'accent.main', color: 'primary.main' },
          }}
        >
          Add Node Type
        </Button>
      </Box>

      <List>
        {nodeTypes.map((type) => (
          <ListItem key={type.id} divider>
            <ListItemText
              primary={type.name}
              secondary={`${type.schema.length} properties defined`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => openDialog(type)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(type.id)} sx={{ color: 'error.main' }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingType ? 'Edit Node Type' : 'Create Node Type'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
          />

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Properties Schema
          </Typography>

          {currentSchema.map((field, index) => (
            <SchemaField
              key={index}
              field={field}
              onChange={(updated) => updateSchemaField(index, updated)}
              onDelete={() => deleteSchemaField(index)}
            />
          ))}

          <Button startIcon={<AddIcon />} onClick={addSchemaField} sx={{ mt: 2 }}>
            Add Property
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            sx={{
              color: 'secondary.main',
              '&:hover': { bgcolor: 'accent.main', color: 'primary.main' },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NodeTypeManager;
