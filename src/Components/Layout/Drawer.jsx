import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuItems from "./Menu/MenuItems";
import { AppName } from "../../Constants/AppConstants";
import UserButton from "../General/UserButton";
import {Logo} from '../../Assets/AssetImports'
import { Grid } from '@mui/material';
const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
 
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:"white",
  color:"black",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    open === true ?   setOpen(false) :  setOpen(true)
  
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
             
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{width:"100%",display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <Typography variant="h6" noWrap component="div">
            {AppName}
          </Typography>
         
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
      <DrawerHeader>
         {/**Content above the nav menu  TODO: MOVE TO ITS OWN COMPONENT */}
        <Grid container sx={{display:"flex", alignItems:"center", margin:"2px 5px 5px 5px  " , justifyContent:"flex-start"}} >
            <Grid item xs={3}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={7}>
              <Grid container >
              <Grid item xs={12}><Typography sx={{fontWeight:"bold"}} >Ryan Zeelie</Typography> </Grid>
              <Grid item xs={12}><Typography sx={{fontSize:"13px"}}>System Admin</Typography></Grid>
              </Grid>
              </Grid>
              <Grid item xs={2}>
              <UserButton />
              </Grid>
        </Grid>
        
        
         
         {/* {open && <img style={{maxWidth:"160px",borderRadius:"10px"}} src={Logo}  />}  */}
          {/* <IconButton style={{maxWidth:"fit-content"}} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
       
        </DrawerHeader>
        <Divider />
      <MenuItems drawerOpen = {open} setDrawerState={setOpen}/>
      </Drawer>
      <Box component="main" sx={{minHeight:"100vh", flexGrow: 1, p: 3, backgroundColor:"#F5F7FD" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
