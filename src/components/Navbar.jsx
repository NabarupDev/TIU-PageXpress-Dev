import React, { useState } from "react"; 
import { AppBar, Toolbar, Button, Box, IconButton, Drawer } from "@mui/material"; 
import { useNavigate } from "react-router-dom"; 
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu Icon

const Navbar = () => { 
  const navigate = useNavigate(); 
  const [openDrawer, setOpenDrawer] = useState(false);

  // Toggle Drawer
  const toggleDrawer = () => { 
    setOpenDrawer(!openDrawer); 
  };

  // Drawer menu items
  const menuItems = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
      <Button
        onClick={() => { navigate("/"); toggleDrawer(); }}
        sx={{ color: "black", fontWeight: 500, textTransform: "none" }}
      >
        Home
      </Button>
      <Button
        onClick={() => { navigate("/frontpageform"); toggleDrawer(); }}
        sx={{ color: "black", fontWeight: 500, textTransform: "none" }}
      >
        Create Front Page
      </Button>
      <Button
        onClick={() => { navigate("/indexform"); toggleDrawer(); }}
        sx={{ color: "black", fontWeight: 500, textTransform: "none" }}
      >
        Create Index Page
      </Button>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1, px: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Box
          component="img"
          src="https://raw.githubusercontent.com/random-derv/images/refs/heads/main/pagexpress-logo.png"
          alt="Techno India Logo"
          sx={{ height: 40, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        {/* Menu Icon for Mobile */}
        <IconButton 
          edge="start" 
          sx={{ 
            display: { xs: 'block', md: 'none' },  // Show only on mobile
            color: 'black'  // Set the icon color to black
          }}  
          onClick={toggleDrawer}
        >
          <MenuIcon sx={{ color: 'black' }} />  {/* Set the MenuIcon color to black */}
        </IconButton>

        {/* Navigation Links for Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "black",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Home
          </Button>

          <Button
            onClick={() => navigate("/frontpageform")}
            sx={{
              color: "black",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Create Front Page
          </Button>

          <Button
            onClick={() => navigate("/indexform")}
            sx={{
              color: "black",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Create Index Page
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        {menuItems}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
