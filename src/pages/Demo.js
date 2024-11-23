import { useState, useCallback } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { AccountTree, TableChart, Description } from '@mui/icons-material';
import api from '../services/Api';
import GraphController from '../components/GraphController';

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

  // Get all nodes - wrapped in useCallback to maintain reference stability
  const fetchNodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.graph.getNodes();
      setNodes(result);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []); // No dependencies needed as all used functions are stable

  // Create a node - wrapped in useCallback to maintain reference stability
  const createNode = useCallback(
    async (labels, properties) => {
      setError(null);
      try {
        await api.graph.createNode(labels, properties);
        // Refresh nodes list after creating new node
        fetchNodes();
      } catch (error) {
        throw error; // Propagate error to be handled by the form
      }
    },
    [fetchNodes]
  ); // Include fetchNodes as dependency since we use it inside

  return (
    <Box sx={{ mt: 8 }}>
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

      <Box sx={{ p: 3 }}>
        {currentView === 0 && (
          <GraphController
            backendNodes={nodes}
            loading={loading}
            error={error}
            onCreateNode={createNode}
            onFetchNodes={fetchNodes}
          />
        )}
        {currentView === 1 && <div>Table View Coming Soon...</div>}
        {currentView === 2 && <div>Document View Coming Soon...</div>}
      </Box>
    </Box>
  );
}

export default Demo;
