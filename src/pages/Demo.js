import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { AccountTree, TableChart, Description, Settings } from '@mui/icons-material';
import GraphController from '../components/GraphController';
import NodeTypeManager from '../components/NodeTypeManager';

function Demo() {
  // State to track which view is currently selected
  const [currentView, setCurrentView] = useState(0);

  // Just keeping empty array for now - we'll add back API integration later
  const [nodes] = useState([]);

  // Handler for tab changes
  const handleViewChange = (event, newValue) => {
    setCurrentView(newValue);
  };

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
        <Tab icon={<Settings />} label="Settings" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {currentView === 0 && <GraphController backendNodes={nodes} />}
        {currentView === 1 && <div>Table View Coming Soon...</div>}
        {currentView === 2 && <div>Document View Coming Soon...</div>}
        {currentView === 3 && <NodeTypeManager />}
      </Box>
    </Box>
  );
}

export default Demo;
