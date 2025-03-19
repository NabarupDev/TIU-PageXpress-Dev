import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    stream: "",
    section: "",
    group: "",
    studentId: "",
    semester: "",
    subject: "",
    institution: "",
    year: "", // Added year property
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("projectData", JSON.stringify(formData));
    navigate("/templates");
  };

  const semesterOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const streamOptions = [
    "B.TECH BT",
    "B.TECH CE",
    "B.TECH CSE",
    "B.TECH CSE-AI",
    "B.TECH ECE",
    "B.TECH EE",
    "B.TECH CSBS",
    "B.TECH IT",
    "B.TECH ME",
    "B.ARCH",
    "B.PHARM",
    "B.COM",
    "B.A ENGLISH",
    "B.A PSYCHOLOGY",
    "B.SC BIOTECHNOLOGY",
    "B.SC DATA SCIENCE",
    "B.SC MICROBIOLOGY",
  ];
  
  const yearOptions = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              fontWeight: 600,
              color: "#333",
            }}
          >
            Project Front Page Generator
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", md: "1.2rem" },
            }}
          >
            Fill in your project details to generate a professional front page
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  placeholder="Nabarup Roy"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  placeholder="EX- 241001011022"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Stream</InputLabel>
                  <Select
                    label="Stream"
                    name="stream"
                    value={formData.stream}
                    placeholder="Select Stream"
                    onChange={handleChange}
                    required
                  >
                    {streamOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Section"
                  name="section"
                  placeholder="EX- BCS2E"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Group"
                  name="group"
                  placeholder="EX- B"
                  value={formData.group}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Semester</InputLabel>
                  <Select
                    label="Semester"
                    name="semester"
                    value={formData.semester}
                    placeholder="Select Semester"
                    onChange={handleChange}
                    required
                  >
                    {semesterOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  placeholder="EX- Data Structures and Algorithms"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Year</InputLabel>
                  <Select
                    label="Year"
                    name="year"
                    value={formData.year}
                    placeholder="Select Year"
                    onChange={handleChange}
                    required
                  >
                    {yearOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option} Year
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Institution Name - Default & Non-Editable */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Institution Name"
                  name="institution"
                  value="Techno India University"
                  disabled
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      cursor: "not-allowed",
                      backgroundColor: "#f5f5f5",
                      color: "#555",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  Next: Select Template
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default FormPage;
