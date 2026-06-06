import { Box, Container, Typography, Chip, useMediaQuery, useTheme } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

const WhatsNew = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Container
      id="whats-new-section"
      maxWidth="md"
      sx={{ px: 0 }}
    >
      <Box
        onClick={() => navigate("/frontpageform")}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          p: { xs: 3, md: 4 },
          backgroundColor: "#fafbfc",
          cursor: "pointer",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            boxShadow: "0 2px 12px rgba(25, 118, 210, 0.08)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, flexWrap: "wrap" }}>
          <Chip
            label="New"
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: "22px",
            }}
          />
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h6"}
            sx={{ fontWeight: 600, color: "#222" }}
          >
            Group Project Front Page
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <GroupsIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: isSmallScreen ? 28 : 36,
              mt: 0.3,
              flexShrink: 0,
              display: { xs: "none", sm: "block" },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              lineHeight: 1.6,
              fontSize: isSmallScreen ? "0.85rem" : "0.95rem",
            }}
          >
            You can now generate front pages for group projects. Add your team members,
            set a topic, and download a single page with everyone's name and ID listed
            in a table -- no more creating these manually in Word.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default WhatsNew;
