import React from 'react';
import { Box, Typography } from '@mui/material';

const Graph = () => {
  return (
    <Box sx={{ mt: 8, p: 3 }}>
      <Typography variant="h4" sx={{ color: 'secondary.main' }}>
        Graph View
      </Typography>
      {/* We'll rebuild the graph components here */}
    </Box>
  );
};

export default Graph;
