// Import necessary MUI components and React hooks
import { 
  AppBar, Toolbar, Button, IconButton, Typography, Box,
  Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FolderOpen } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ProjectTree from './ProjectTree';  // Import the new ProjectTree component

// Import fonts for consistent typography
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Custom theme definition
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fafaf9', // White for primary elements
    },
    secondary: {
      main: '#0c0a09', // Black for AppBar background
    },
    accent: {
      main: '#d97706', // Orange for hover effects
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 16,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
      },
    },
  },
});

export default function CustomAppBar({ showProject = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState("Flight Control");

  const handleProjectSelect = (projectName) => {
    setCurrentProject(projectName);
    setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="fixed" color="secondary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: 'primary.main',
              '&:hover': { backgroundColor: 'transparent' }
            }}
          >
            Clarify
          </Button>

          {showProject && (
            <Box sx={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <FolderOpen sx={{ color: '#d97706' }} />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 400
                }}
              >
                {currentProject}
              </Typography>
            </Box>
          )}

          {showProject && (
            <IconButton 
              edge="end" 
              sx={{ color: 'primary.main' }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ProjectTree onSelect={handleProjectSelect} />
      </Drawer>
    </ThemeProvider>
  );
}