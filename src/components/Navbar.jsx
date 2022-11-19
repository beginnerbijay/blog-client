import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom'

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const removeuser = () =>{
    localStorage.removeItem("userinfo")
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ViBlog
      </Typography>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton >
            <NavLink to='/' style={{ textDecoration: 'none' }} ><ListItemText primary='Home' /></NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
            <NavLink to='/create' style={{ textDecoration: 'none' }} ><ListItemText primary='Add Blog' /></NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
            <NavLink to='/myblog' style={{ textDecoration: 'none' }} ><ListItemText primary='My Blog' /></NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
            <NavLink to='/login' style={{ textDecoration: 'none' }} ><ListItemText primary='Log Out' onClick={removeuser}/></NavLink>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ViBlog
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NavLink to='/' style={{ textDecoration: 'none' }} ><Button  sx={{ color: '#fff' }}>Home</Button></NavLink>
                <NavLink to='/create' style={{ textDecoration: 'none' }} ><Button  sx={{ color: '#fff' }}>Add Blog</Button></NavLink>
                <NavLink to='/myblog' style={{ textDecoration: 'none' }} ><Button  sx={{ color: '#fff' }}>My Blog</Button></NavLink>
                <NavLink to='/login' style={{ textDecoration: 'none' }} ><Button  sx={{ color: '#fff' }} onClick={removeuser}>Log Out</Button></NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;