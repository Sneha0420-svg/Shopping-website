import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {  Badge, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const drawerWidth = 240;
const navItems = ['PRODUCTS', 'CATEGORIES'];


function DrawerAppBar(props) {
   const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);  
    const [cart,setCart]=useState([])
  

    const fetchCartitems=async ()=>{

      try{
        const res=await axios.get("http://localhost:3000/cart")
        setCart(res.data)
      }
      catch(err){
        console.log(err.message)
      }
    }
     useEffect(()=>{
        fetchCartitems()
      },[cart])
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
      <Button href='/'>
      <Typography variant="h5" sx={{ my: 2 ,color:"violet",fontFamily:"cursive"}}>
        KID'S DELIGHT
      </Typography>
      </Button>
      <Divider />
      <Button href='/products'>
        <Typography variant="h6" sx={{color:"black",fontFamily:"cursive"}}>PRODUCTS</Typography>
      </Button>
      <Divider/>
      <Button href='/cart'>
        <Typography variant="h6" sx={{color:"black",fontFamily:"cursive"}}>SHOPPING CART  <Badge badgeContent={cart.length} color='error'>
                <ShoppingCartIcon />
                </Badge></Typography>
      </Button>
      <Divider/>
      <Button href='/account'>
        <Typography variant="h6" sx={{color:"black",fontFamily:"cursive"}}>PROFILE <AccountCircleIcon /></Typography>
      </Button>

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar  sx={{backgroundColor:"rgb(83, 30, 83)"}}>
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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' ,fontFamily:"cursive"} }}
          >
            <Button sx={{color:"inherit",fontFamily:"cursive",fontSize:"30px"}} href='/'>
            KID'S DELIGHT
            </Button>
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {navItems.map((item) => ( */}
              <Button href='/products' sx={{ color: '#fff'}}>
                PRODUCTS
              </Button>
              
              <Tooltip title="Cart">
                 <IconButton sx={{color:"inherit"}} href='/cart'>
                <Badge badgeContent={cart.length} color='error'>
                <ShoppingCartIcon />
                </Badge>
                
                 </IconButton>
                 </Tooltip>
                 <Tooltip title="Profile">
                 <IconButton sx={{color:"inherit"}} href='/account'>
                
                <AccountCircleIcon />
               
                
                 </IconButton>
                 </Tooltip>
                 
              
              
            {/* ))} */}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
      
    </Box>
    
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
