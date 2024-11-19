// Import necessary components and hooks
import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { AccountTree, TableChart, Description } from '@mui/icons-material';

function Demo() {
  // State to track which view is currently selected
  // 0 = Graph, 1 = Table, 2 = Document
  const [currentView, setCurrentView] = useState(0);

  // Handler for tab changes
  const handleViewChange = (event, newValue) => {
    setCurrentView(newValue);
  };

  return (
    // Add top margin to account for AppBar height
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
            color: '#d97706 !important'  // Force accent color for selected tab
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#d97706'    // Change the underline color
          }
        }}
      >
        <Tab icon={<AccountTree />} label="Graph" />
        <Tab icon={<TableChart />} label="Table" />
        <Tab icon={<Description />} label="Document" />
      </Tabs>

      {/* View content area */}
      <Box sx={{ p: 3 }}>
        {currentView === 0 && (
          <div>Graph View Coming Soon...</div>
        )}
        {currentView === 1 && (
          <div>Table View Coming Soon...</div>
        )}
        {currentView === 2 && (
          <div>Document View Coming Soon...</div>
        )}
      </Box>
    </Box>
  );
}

export default Demo;