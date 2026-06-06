import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GeneratePage = () => {
  const navigate = useNavigate();


  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Container
      id="generator-section"
      maxWidth="md"
      sx={{
        textAlign: "center",
        py: { xs: 6, md: 10 },
      }}
    >
      {}
      <Typography
        variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
        fontWeight="bold"
        marginTop={"2rem"}
        gutterBottom
      >
        Generate Your Front & Index Page
      </Typography>

      {}
      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: "gray",
          fontSize: isSmallScreen ? "0.9rem" : "1rem",
          px: isSmallScreen ? 2 : 0,
        }}
      >
        Create professional, university-compliant documents in seconds.
        Choose the document type you need to generate.
      </Typography>

      {}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {}
        <Button
          variant="outlined"
          sx={{
            width: isSmallScreen ? 200 : 240,
            height: 60,
            borderColor: "blue",
            color: "blue",
            fontSize: isSmallScreen ? "0.85rem" : "1rem",
            fontWeight: "500",
            "&:hover": {
              bgcolor: "rgba(0, 0, 255, 0.05)",
            },
          }}
          onClick={() => navigate("/frontpageform")}
        >
          Generate Front Page
        </Button>

        {}
        <Button
          variant="contained"
          sx={{
            width: isSmallScreen ? 200 : 240,
            height: 60,
            bgcolor: "blue",
            fontSize: isSmallScreen ? "0.85rem" : "1rem",
            fontWeight: "500",
            "&:hover": {
              bgcolor: "darkblue",
            },
          }}
          onClick={() => navigate("/indexform")}
        >
          Generate Index Page
        </Button>
      </Box>

      {}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {}
        <Box sx={{ maxWidth: 240, textAlign: "center" }}>
          <Typography
            variant="body2"
            color="gray"
            sx={{ fontSize: isSmallScreen ? "0.8rem" : "0.9rem" }}
          >
            Create a professional cover page for your assignments and projects.
          </Typography>
        </Box>

        {}
        <Box sx={{ maxWidth: 240, textAlign: "center" }}>
          <Typography
            variant="body2"
            color="gray"
            sx={{ fontSize: isSmallScreen ? "0.8rem" : "0.9rem" }}
          >
            Create a structured table of contents for your documents.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default GeneratePage;
