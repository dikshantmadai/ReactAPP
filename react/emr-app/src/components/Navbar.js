import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EqualizerIcon from '@mui/icons-material/Equalizer';  // Import the EqualizerIcon
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EMR System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {/* Close button inside Drawer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Divider */}
        <Divider />

        <List sx={{ width: 250 }}>
          {/* Create Patient Link */}
          <ListItem 
            button 
            key="Create Patient" 
            component={Link} 
            to="/create-patient"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Patient" />
          </ListItem>

          {/* Homepage Link */}
          <ListItem 
            button 
            key="Homepage" 
            component={Link} 
            to="/Homepage"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItem>

          {/* Health Facilities Chart Link */}
          <ListItem 
            button 
            key="Data Visualization" 
            component={Link} 
            to="/health-facilities-chart"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <EqualizerIcon />  {/* Icon for the Health Facilities Chart */}
            </ListItemIcon>
            <ListItemText primary="Data Visualization" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
