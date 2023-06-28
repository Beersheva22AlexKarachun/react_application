import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteType } from "./Navigator";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Tab, Toolbar, Typography, styled, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps, AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NavigatorPortrait: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0)

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  // routes.map(route => <Tab component={Link} to={route.to} label={route.label} key={route.label} />)


  function getRoutes() {
    return <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      mt={15}
    >
      <List>
        {routes.map((route, index) => (
          <ListItem key={route.label} disablePadding>
            <ListItemButton>
              <Tab component={Link} to={route.to} label={route.label} key={route.label} />
              {/* <ListItemText primary={route.label} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box >
  }

  return <Typography variant="h3" align="center">
    <Box bgcolor={"lightskyblue"}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
      </Toolbar>
    </Box>
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {getRoutes()}

    </SwipeableDrawer>
    <Outlet></Outlet>

  </Typography >
}

export default NavigatorPortrait