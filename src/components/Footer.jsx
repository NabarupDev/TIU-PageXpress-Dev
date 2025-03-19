import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="footer-section"
      component="footer"
      sx={{ backgroundColor: "#F5F7FA", py: 4, mt: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          {/* Logo Section */}
          <Grid item xs={12} sm="auto">
            <img
              src="https://raw.githubusercontent.com/random-derv/images/refs/heads/main/pagexpress-logo.png"
              alt="TIU Logo"
              loading="lazy"
              width={50}
              height={50}
            />
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm="auto">
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              {[
                { name: "Home", id: "home-section" },
                { name: "Generator", id: "generator-section" },
                { name: "How It Works", id: "how-it-works-section" },
                { name: "Benefits", id: "benefits-section" },
                { name: "Instructions", id: "instructions-section" }
              ].map((item, index) => (
                <Grid item key={index}>
                  <Link
                    component="button"  // Use button instead of href
                    onClick={() => scrollToSection(item.id)}
                    underline="hover"
                    sx={{
                      color: "gray",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      display: "inline-block"
                    }}
                  >
                    {item.name}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Box sx={{ borderBottom: "1px solid #ddd", my: 2 }} />

        {/* Copyright Text */}
        <Typography
          variant="body2"
          color="gray"
          align="center"
          sx={{ fontSize: "14px", mt: 2 }}
        >
          © {new Date().getFullYear()} Nabarup Roy. All rights reserved.
          <br />
          TIU PageXpress - Created by Nabarup Roy
        </Typography>

        {/* Contact Email */}
        <Typography
          variant="body2"
          color="gray"
          align="center"
          sx={{ fontSize: "14px", mt: 2 }}
        >
          If you're facing any issues, feel free to reach out to us via email at{" "}
          <Link href="mailto:nabaruproy.dev@gmail.com" sx={{ color: "gray", fontWeight: 500 }}>
            nabaruproy.dev@gmail.com
          </Link>
        </Typography>

        {/* Social Media Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <IconButton
            component="a"
            href="https://github.com/NabarupDev"
            target="_blank"
            sx={{ color: "black" }}
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.linkedin.com/in/nabarup-roy/"
            target="_blank"
            sx={{ color: "black" }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
