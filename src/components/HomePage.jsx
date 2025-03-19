import { Box, Button, Typography, useMediaQuery, keyframes } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
        src="https://raw.githubusercontent.com/random-derv/images/refs/heads/main/pagexpress-logo.png"
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
