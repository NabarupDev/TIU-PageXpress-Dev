import { Box, Button, Typography, useMediaQuery, keyframes } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import pagexpressLogo from "../assets/pagexpress-logo.png";
import { useState, useEffect } from "react";

// Define bounce animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const HomePage = () => {
  // Media Queries for Responsive Adjustments
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  // State for download count
  const [downloadCount, setDownloadCount] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchDownloadCount = async () => {
      try {
        const response = await fetch(`${API_NINJAS_BASE_URL}?id=${COUNTER_ID}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_NINJAS_KEY
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setDownloadCount(data.value || 0);
        } else {
          // console.warn('Could not fetch download count');
          setDownloadCount(null);
        }
      } catch (error) {
        // console.warn('Download counter unavailable:', error.message);
        setDownloadCount(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloadCount();
  }, []);

  return (
    <Box
      id="home-section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "white",
        color: "black",
        px: 2,
        paddingTop: "80px",
      }}
    >
      {/* Responsive Logo */}
      <img
        src={pagexpressLogo}
        alt="TIU Logo"
        style={{
          width: isSmallScreen ? "80px" : isMediumScreen ? "100px" : "130px",
          marginBottom: "20px",
        }}
      />

      {/* Responsive Heading */}
      <Typography
        variant={isSmallScreen ? "h4" : isMediumScreen ? "h3" : "h2"}
        fontWeight="bold"
      >
        TIU PageXpress
      </Typography>


      {/* Responsive Subtext */}
      <Typography
        variant={isSmallScreen ? "body1" : "h6"}
        sx={{ mt: 2, mb: 4, maxWidth: "600px" }}
      >
        Create professional front & index pages for our Techno India University assignments
        with just a few clicks.
      </Typography>

      {/* Download Counter Display */}
      {!loading && downloadCount !== null && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <DownloadIcon sx={{ color: "primary.main", fontSize: isSmallScreen ? 20 : 24 }} />
          <Typography
            variant={isSmallScreen ? "body1" : "h6"}
            sx={{ 
              fontWeight: "600",
              color: "text.primary",
              letterSpacing: "0.5px"
            }}
          >
            {formatCompactNumber(downloadCount)}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            sx={{ 
              color: "text.secondary",
              fontWeight: "400"
            }}
          >
            Total Downloads
          </Typography>
        </Box>
      )}

      {/* Get Started Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "blue",
          color: "white",
          px: isSmallScreen ? 3 : 4,
          py: 1.5,
          fontSize: isSmallScreen ? "0.9rem" : "1rem",
          borderRadius: "8px",
          "&:hover": { bgcolor: "darkblue" },
        }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        Get Started
      </Button>

      {/* Animated Scroll Down Indicator */}
      <Box sx={{ mt: 6, cursor: "pointer" }}>
        <KeyboardArrowDownIcon
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          sx={{
            fontSize: isSmallScreen ? 30 : 40,
            color: "gray",
            animation: `${bounce} 1.5s infinite`, // Apply bounce animation
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
