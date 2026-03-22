import { Box, Container, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  { number: "1", title: "Enter Details", description: "Fill in your project information and personal details." },
  { number: "2", title: "Select Template", description: "Choose from professionally designed templates." },
  { number: "3", title: "Preview", description: "Review your document before finalizing." },
  { number: "4", title: "Download Instantly", description: "Get your document ready to use immediately." },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxHeight, setMaxHeight] = useState("auto");

  // Calculate max height for all boxes on larger screens
  useEffect(() => {
    if (!isSmallScreen) {
      const boxHeights = Array.from(document.getElementsByClassName("step-box")).map(
        (box) => box.offsetHeight
      );
      setMaxHeight(`${Math.max(...boxHeights)}px`);
    } else {
      setMaxHeight("auto");
    }
  }, [isSmallScreen]);

  return (
    <Container
      id="how-it-works-section"
      maxWidth="lg"
      sx={{ textAlign: "center", py: { xs: 6, md: 10 } }}
    >
      {/* Section Title */}
      <Typography
        variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
        fontWeight="bold"
        marginTop={"2rem"}
        gutterBottom
      >
        How It Works
      </Typography>

      {/* Steps Grid */}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        {steps.map((step, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box
              className="step-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: { xs: 2, md: 3 },
                minHeight: maxHeight, // Set equal height for all boxes on desktop
                boxShadow: isSmallScreen ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow for desktop
                borderRadius: "10px",
                position: "relative", // Needed to keep underline inside the box
              }}
            >
              {/* Step Number Circle */}
              <Box
                sx={{
                  width: isSmallScreen ? 50 : 60,
                  height: isSmallScreen ? 50 : 60,
                  borderRadius: "50%",
                  backgroundColor: "#E0E0E0", // Light gray background
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  mb: 2,
                  transition: "background-color 0.3s",
                  "&:hover": { backgroundColor: theme.palette.primary.dark, color: "white", cursor: "pointer" },
                }}
              >
                {step.number}
              </Box>

              {/* Step Title */}
              <Typography variant={isSmallScreen ? "h6" : isMediumScreen ? "h6" : "h5"} fontWeight="bold">
                {step.title}
              </Typography>

              {/* Step Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1, fontSize: isSmallScreen ? "0.9rem" : "1rem", pb: 3 }}
              >
                {step.description}
              </Typography>

              {/* Underline Inside the Box & Aligned in a Row */}
              <Box
                sx={{
                  width: "80%",
                  height: "2px",
                  backgroundColor: theme.palette.primary.light,
                  position: "absolute",
                  bottom: isSmallScreen ? "10px" : "20px", // Adjust for mobile
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
