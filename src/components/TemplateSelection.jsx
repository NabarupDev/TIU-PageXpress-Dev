import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const TemplateSelection = () => {
  const navigate = useNavigate();
  const projectData = JSON.parse(localStorage.getItem("projectData") || "{}");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSelectTemplate = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);
    navigate("/frontpreview");
  };

  if (!projectData.name) {
    navigate("/");
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box my={isSmallScreen ? 2 : 4}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 2 : 4 }}>
        <Typography
            variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              fontWeight: 600,
              color: "#333",
            }}
          >
            Select Template

          </Typography>
          <Typography
            variant={isSmallScreen ? "body1" : "h6"}
            align="center"
            color="textSecondary"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            }}
          >
            Choose a template design for your front page
          </Typography>

          <Grid container spacing={isSmallScreen ? 2 : 4} sx={{ mt: 2 }}>
            {[
              {
                id: "template1",
                image:
                  "https://raw.githubusercontent.com/random-derv/images/refs/heads/main/1st.png",
                text: "Formal and structured front page with essential academic details.",
              },
              {
                id: "template2",
                image:
                  "https://raw.githubusercontent.com/random-derv/images/refs/heads/main/2nd.png",
                text: "Modern and minimalistic academic front page with clear details.",
              },
              {
                id: "template3",
                image:
                  "https://raw.githubusercontent.com/random-derv/images/refs/heads/main/3rd.png",
                text: "Balanced academic cover page with a centered institutional logo.",
              },
            ].map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      height: isSmallScreen ? 200 : 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={template.image}
                      alt="Preview"
                      loading="lazy"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 0 }}>
                    <Typography
                      align="center"
                      variant={isSmallScreen ? "body2" : "body1"}
                    >
                      {template.text}
                    </Typography>
                  </CardContent>
                  <Box p={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      Select
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={isSmallScreen ? 2 : 4} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/frontpageform")}
              sx={{ mr: 2 }}
            >
              Back to Form
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TemplateSelection;
