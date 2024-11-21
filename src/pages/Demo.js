// Import necessary components and hooks
import { useState } from 'react';
import { Box, Tabs, Tab, Button, Card, CardContent, Typography, Stack } from '@mui/material';
import { AccountTree, TableChart, Description } from '@mui/icons-material';
import PropTypes from 'prop-types';
import api from '../services/Api';

// NodeCard component moved outside Demo for cleaner organization
const NodeCard = ({ node }) => (
  <Card variant="outlined" sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {node.properties.name || 'Unnamed Node'}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        ID: {node.id}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Labels: {node.labels.join(', ')}
      </Typography>
      <Typography variant="body2">{node.properties.description || 'No description'}</Typography>
    </CardContent>
  </Card>
);

// Define prop types for NodeCard
NodeCard.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    properties: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

function Demo() {
  // State to track which view is currently selected
  const [currentView, setCurrentView] = useState(0);
  // State to store nodes
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler for tab changes
  const handleViewChange = (event, newValue) => {
    setCurrentView(newValue);
  };

  // Get all nodes
  const fetchNodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.graph.getNodes();
      setNodes(result);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Create a test node
  const testCreateNode = async () => {
    setError(null);
    try {
      await api.graph.createNode(['Requirement'], {
        name: 'Test Requirement',
        description: 'This is a test requirement',
      });
      // Refresh nodes list after creating new node
      fetchNodes();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      {/* View selector tabs */}
      <Tabs
        value={currentView}
        onChange={handleViewChange}
        centered
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .Mui-selected': {
            color: '#d97706 !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#d97706',
          },
        }}
      >
        <Tab icon={<AccountTree />} label="Graph" />
        <Tab icon={<TableChart />} label="Table" />
        <Tab icon={<Description />} label="Document" />
      </Tabs>

      {/* View content area */}
      <Box sx={{ p: 3 }}>
        {currentView === 0 && (
          <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button variant="contained" onClick={testCreateNode} color="primary">
                Create Test Node
              </Button>
              <Button variant="outlined" onClick={fetchNodes} color="primary">
                Get All Nodes
              </Button>
            </Stack>

            {/* Error display */}
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                Error: {error}
              </Typography>
            )}

            {/* Loading state */}
            {loading && <Typography sx={{ mb: 2 }}>Loading...</Typography>}

            {/* Nodes display */}
            {nodes.length > 0
              ? nodes.map((node) => <NodeCard key={node.id} node={node} />)
              : !loading && (
                  <Typography color="text.secondary">No nodes found. Try creating one!</Typography>
                )}
          </Box>
        )}
        {currentView === 1 && <div>Table View Coming Soon...</div>}
        {currentView === 2 && <div>Document View Coming Soon...</div>}
      </Box>
    </Box>
  );
}

export default Demo;
