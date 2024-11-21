// Import necessary MUI components and React hooks
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  Drawer,
  Avatar,
} from '@mui/material';
import { FolderOpen } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectTree from './ProjectTree';

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
    MuiTypography: {
      styleOverrides: {
        appLabel: {
          textTransform: 'none',
          fontSize: '1.2rem',
          fontFamily: 'Roboto, Arial, sans-serif',
        },
      },
    },
  },
});

function CustomAppBar({ showProject = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState('Flight Control');

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
              '&:hover': { backgroundColor: '#d97706' },
            }}
          >
            Clarify
          </Button>

          {showProject && (
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconButton
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#d97706',
                  },
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <FolderOpen />
              </IconButton>
              <Typography variant="appLabel" sx={{ color: 'primary.main' }}>
                {currentProject}
              </Typography>
            </Box>
          )}

          {showProject && (
            <Avatar
              sx={{
                cursor: 'pointer',
                backgroundColor: 'primary.main',
                color: 'secondary.main',
                '&:hover': {
                  backgroundColor: '#d97706',
                },
              }}
            >
              U
            </Avatar>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <ProjectTree onSelect={handleProjectSelect} />
      </Drawer>
    </ThemeProvider>
  );
}

CustomAppBar.propTypes = {
  showProject: PropTypes.bool,
};

export default CustomAppBar;
