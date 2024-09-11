import React from 'react';
import AppBar from '@mui/material/AppBar';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, List, ListItem } from '@mui/material';

export const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component={'header'}>
        <AppBar component={'nav'}>
          <List>
            <ListItem>
              <NavLink to={'/'}>Главная</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={'orgs'}>Организации</NavLink>
            </ListItem>
          </List>
        </AppBar>
      </Box>
      <Box component={'main'} sx={{ p: 15 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
