import { AppBar, Toolbar } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectTree from '../../../components/ProjectTree'; // TODO: Rename to ComponentTree
import AvatarButton from '../../../components/ui/buttons/AvatarButton';
import ComponentButton from '../../../components/ui/buttons/ComponentButton';
import ClarifyButton from '../../../components/ui/buttons/ClarifyButton';
import DrawerInterface from '../../../components/ui/menus/DrawerInterface';

function CustomAppBar({ showComponents = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('Flight Control');

  const handleComponentSelect = (componentName) => {
    setCurrentComponent(componentName);
    setDrawerOpen(false);
  };

  const handleProfileClick = () => {
    // We'll implement this when we add user settings
    // For now it's just a stub that does nothing
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ClarifyButton />

          {showComponents && (
            <ComponentButton componentName={currentComponent} onClick={() => setDrawerOpen(true)} />
          )}

          {showComponents && <AvatarButton label="User Settings" onClick={handleProfileClick} />}
        </Toolbar>
      </AppBar>

      <DrawerInterface open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <ProjectTree onSelect={handleComponentSelect} />
      </DrawerInterface>
    </>
  );
}

CustomAppBar.propTypes = {
  showComponents: PropTypes.bool,
};

export default CustomAppBar;
