import { Box, Container, Typography, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";

const benefits = [
  
  {
    title: "No Need to Use Word or Design from Scratch",
    description: "Save time by instantly generating structured documents without needing Microsoft Word or any design skills.",
  },
  {
    title: "No Advertisements",
    description: "Our platform is completely ad-free, providing a clean and distraction-free experience while you create your documents.",
  },
  {
    title: "No Watermarks",
    description: "All generated documents are free from watermarks, ensuring professional presentation of your academic work.",
  },
  {
    title: "Designed for Techno India University",
    description: "Templates are specifically created to meet Techno India University's formatting requirements and standards.",
  },
  {
    title: "Professional Output",
    description: "Generate high-quality, professionally formatted documents that enhance the presentation of your academic work.",
  },
];

const WhyUseThis = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      id="benefits-section"
      maxWidth="lg"
      sx={{
        textAlign: "center",
        py: { xs: 6, md: 10 },
      }}
    >
      {}
      <Typography
        variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
        fontWeight="bold"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Why Use This?
      </Typography>

      {}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        {benefits.map((benefit, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper
              elevation={isSmallScreen ? 2 : 6}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                textAlign: "left",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backgroundColor: index % 2 === 0 ? "#F9F9F9" : "white",
                "&:hover": {
                  cursor: "pointer",
                  transform: "translateY(-5px)",
                },
              }}
            >
              {}
              <Typography
                variant={isSmallScreen ? "h6" : "h5"}
                fontWeight="bold"
                sx={{ color: theme.palette.primary.main }}
              >
                {benefit.title}
              </Typography>

              {}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: isSmallScreen ? "0.9rem" : "1rem",
                  lineHeight: "1.5",
                }}
              >
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyUseThis;
