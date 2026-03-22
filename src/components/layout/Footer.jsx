import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import pagexpressLogo from "../../assets/pagexpress-logo.png";
import { useState, useEffect } from "react";

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "nabaruproy.dev@gmail.com";

  // State for download count
  const [downloadCount, setDownloadCount] = useState(null);

  // API Ninjas Counter configuration
  const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY;
  const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/counter';
  const COUNTER_ID = import.meta.env.VITE_COUNTER_ID;

  // Format number to compact notation (1k, 1.5k, 1M, etc.)
  const formatCompactNumber = (num) => {
    if (num < 1000) return num.toString();
    if (num < 1000000) {
      const formatted = num / 1000;
      return formatted % 1 === 0 ? `${formatted}k` : `${formatted.toFixed(1)}k`;
    }
    if (num < 1000000000) {
      const formatted = num / 1000000;
      return formatted % 1 === 0 ? `${formatted}M` : `${formatted.toFixed(1)}M`;
    }
    const formatted = num / 1000000000;
    return formatted % 1 === 0 ? `${formatted}B` : `${formatted.toFixed(1)}B`;
  };

  // Fetch download count on component mount
  useEffect(() => {
    const CACHE_KEY = 'download_count_cache';
    const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    const fetchDownloadCount = async () => {
      try {
        // Check if cached data exists and is still valid
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { value, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          
          // If cache is still valid (less than 3 hours old)
          if (now - timestamp < CACHE_DURATION) {
            setDownloadCount(value);
            return;
          }
        }

        // Fetch fresh data from API
        const response = await fetch(`${API_NINJAS_BASE_URL}?id=${COUNTER_ID}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_NINJAS_KEY
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const downloadValue = data.value || 0;
          setDownloadCount(downloadValue);
          
          // Store in local storage with timestamp
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            value: downloadValue,
            timestamp: Date.now()
          }));
        }
      } catch (error) {
        // console.warn('Download counter unavailable:', error.message);
      }
    };
    fetchDownloadCount();
  }, []);

  return (
    <Box
      id="footer-section"
      component="footer"
      sx={{ backgroundColor: "#F5F7FA", py: 4, mt: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          {/* Logo Section */}
          <Grid size={{ xs: 12, sm: "auto" }}>
            <img
              src={pagexpressLogo}
              alt="TIU Logo"
              loading="lazy"
              width={50}
              height={50}
            />
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: "auto" }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              {[
                { name: "Home", id: "home-section" },
                { name: "Generator", id: "generator-section" },
                { name: "How It Works", id: "how-it-works-section" },
                { name: "Benefits", id: "benefits-section" },
                { name: "Instructions", id: "instructions-section" }
              ].map((item, index) => (
                <Grid key={index}>
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

        {/* Download Counter Display */}
        {downloadCount !== null && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, my: 2 }}>
            <DownloadIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography
              variant="body1"
              sx={{ 
                fontWeight: "600",
                color: "text.primary"
              }}
            >
              {formatCompactNumber(downloadCount)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                color: "text.secondary"
              }}
            >
              Total Downloads
            </Typography>
          </Box>
        )}

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
          <Link href={`mailto:${contactEmail}`} sx={{ color: "gray", fontWeight: 500 }}>
            {contactEmail}
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
