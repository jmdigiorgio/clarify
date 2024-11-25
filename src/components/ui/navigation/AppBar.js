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
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectTree from '../../ProjectTree';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function CustomAppBar({ showProject = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState('Flight Control');

  const handleProjectSelect = (projectName) => {
    setCurrentProject(projectName);
    setDrawerOpen(false);
  };

  return (
    <>
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
    </>
  );
}

CustomAppBar.propTypes = {
  showProject: PropTypes.bool,
};

export default CustomAppBar;
