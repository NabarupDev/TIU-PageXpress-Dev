import { useState } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import pagexpressLogo from "../../assets/pagexpress-logo.png";

const HomeNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const menuItems = [
    { name: "Home", id: "home-section" },
    { name: "Generator", id: "generator-section" },
    { name: "How It Works", id: "how-it-works-section" },
    { name: "Benefits", id: "benefits-section" },
    { name: "Instructions", id: "instructions-section" }
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        padding: "10px 0",
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Box>
          <img
            src={pagexpressLogo}
            alt="TIU Logo"
            loading="lazy"
            style={{ width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px", cursor: "pointer" }}
            onClick={() => scrollToSection("home-section")}
          />
        </Box>

        {!isMobile ? (
          <Box sx={{ display: "flex", gap: "30px" }}>
            {menuItems.map((item) => (
              <Typography
                key={item.id}
                variant="body1"
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: "black",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontSize: "1rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Box>
        ) : (

          <IconButton onClick={() => setMobileOpen(true)} color="black">
            <MenuIcon />
          </IconButton>
        )}

        <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.id} onClick={() => scrollToSection(item.id)}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
