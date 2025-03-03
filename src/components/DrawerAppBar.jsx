import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      setCart(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cart]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h5" sx={{ my: 2, color: "violet", fontFamily: "cursive" }}>
          KID'S DELIGHT
        </Typography>
      </Link>
      <Divider />
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" sx={{ color: "black", fontFamily: "cursive" }}>PRODUCTS</Typography>
      </Link>
      <Divider />
      <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" sx={{ color: "black", fontFamily: "cursive" }}>
          SHOPPING CART
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Typography>
      </Link>
      <Divider />
      <Link to="/account" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" sx={{ color: "black", fontFamily: "cursive" }}>
          PROFILE <AccountCircleIcon />
        </Typography>
      </Link>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: "rgb(83, 30, 83)" }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>

          {/* Website Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", fontFamily: "cursive", fontSize: "30px" }}>
              KID'S DELIGHT
            </Link>
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: "none", sm: "flex", gap: 3 } }}>
            <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6">PRODUCTS</Typography>
            </Link>

            <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" sx={{ color: "inherit" }}>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton component={Link} to="/account" sx={{ color: "inherit" }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
