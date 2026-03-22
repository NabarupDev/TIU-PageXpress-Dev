import { Box, Container, Typography, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";

const instructions = [
  {
    title: "Required Information",
    details: [
      "Your full name as registered with the university",
      "Your university student ID number",
      "Your department name",
      "Subject/course name or code",
      "Project/assignment title",
      "Submission date",
      "Other relevant details",
    ],
  },
  {
    title: "Document Usage",
    details: [
      "Download the document in PDF format for consistent formatting",
      "Check all details in the preview before finalizing",
      "Print on A4 size paper for best results",
      "Do not modify the university logo or layout structure",
      "Attach the generated front page as the first page of your document",
      "Place the index page immediately after the front page",
    ],
  },
  {
    title: "Guidelines",
    details: [
      "Use the exact details as registered with the university",
      "Ensure project titles are concise yet descriptive",
      "Follow the standard naming convention for subject codes",
      "Include all required sections in your index page",
      "Maintain consistent formatting throughout your document",
      "Verify all information before final submission",
    ],
  },
];

const Instructions = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      id="instructions-section"
      maxWidth="lg"
      sx={{
        textAlign: "center",
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Section Title */}
      <Typography
        variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"} // Adaptive text size
        fontWeight="bold"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Instructions
      </Typography>

      {/* Instructions Grid */}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        {instructions.map((section, index) => (
          <Grid size={{ xs: 12, sm: 12, md: 10 }} key={index}>
            <Paper
              elevation={isSmallScreen ? 2 : 6}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                textAlign: "left",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backgroundColor: index % 2 === 0 ? "#F9F9F9" : "white", // Alternating colors for better UI
              }}
            >
              {/* Section Title */}
              <Typography
                variant={isSmallScreen ? "h6" : "h5"} // Responsive font size
                fontWeight="bold"
                sx={{ color: theme.palette.primary.main }}
              >
                {section.title}
              </Typography>

              {/* List of Details */}
              <Box component="ul" sx={{ paddingLeft: 3, mt: 1 }}>
                {section.details.map((item, idx) => (
                  <Box component="li" key={idx} sx={{ mb: 1 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: isSmallScreen ? "0.9rem" : "1rem" }} // Scaling text
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Instructions;
