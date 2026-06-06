import { Box, Button, Typography, useMediaQuery, keyframes } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import pagexpressLogo from "../../assets/pagexpress-logo.png";
import { useState, useEffect } from "react";
import WhatsNew from "../sections/WhatsNew";


const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const HomePage = () => {

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  const currentDate = new Date();
  const expiryDate = new Date("2026-08-01T00:00:00");
  const showWhatsNew = currentDate < expiryDate;


  const [downloadCount, setDownloadCount] = useState(null);
  const [loading, setLoading] = useState(true);


  const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY;
  const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/counter';
  const COUNTER_ID = import.meta.env.VITE_COUNTER_ID;


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


  useEffect(() => {
    const CACHE_KEY = 'download_count_cache';
    const CACHE_DURATION = 3 * 60 * 60 * 1000;

    const fetchDownloadCount = async () => {
      try {

        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { value, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          

          if (now - timestamp < CACHE_DURATION) {
            setDownloadCount(value);
            setLoading(false);
            return;
          }
        }


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
          

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            value: downloadValue,
            timestamp: Date.now()
          }));
        } else {

          setDownloadCount(null);
        }
      } catch (error) {

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
      {}
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


      {}
      <Typography
        variant={isSmallScreen ? "body1" : "h6"}
        sx={{ mt: 1.5, mb: 2, maxWidth: "600px" }}
      >
        Create professional front & index pages for our Techno India University assignments
        with just a few clicks.
      </Typography>

      {showWhatsNew && (
        <Box sx={{ width: "100%", maxWidth: "md", px: { xs: 2, md: 0 }, mb: 2.5 }}>
          <WhatsNew />
        </Box>
      )}

      {}
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

      {}
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

      {}
      <Box sx={{ mt: 4, cursor: "pointer" }}>
        <KeyboardArrowDownIcon
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          sx={{
            fontSize: isSmallScreen ? 30 : 40,
            color: "gray",
            animation: `${bounce} 1.5s infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
