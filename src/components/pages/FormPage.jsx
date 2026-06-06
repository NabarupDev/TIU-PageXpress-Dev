import React, { useState, useEffect } from "react";
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
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FormPage = () => {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState("individual");
  const [formData, setFormData] = useState({
    name: "",
    stream: "",
    section: "",
    group: "",
    studentId: "",
    semester: "",
    subject: "",
    institution: "Techno India University",
    year: "",
    topic: "",
  });
  const [members, setMembers] = useState([
    { name: "", studentId: "" },
    { name: "", studentId: "" },
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem("projectData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData((prev) => ({ ...prev, ...parsedData }));
      if (parsedData.projectType) {
        setProjectType(parsedData.projectType);
      }
      if (parsedData.members && Array.isArray(parsedData.members)) {
        setMembers(parsedData.members);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProjectTypeChange = (event, newType) => {
    if (newType !== null) {
      setProjectType(newType);
    }
  };

  const handleMemberChange = (index, field, value) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMember = () => {
    setMembers((prev) => [...prev, { name: "", studentId: "" }]);
  };

  const removeMember = (index) => {
    if (members.length <= 2) return;
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (projectType === "individual") {
      const dataToStore = {
        projectType: "individual",
        name: formData.name,
        studentId: formData.studentId,
        stream: formData.stream,
        section: formData.section,
        group: formData.group,
        semester: formData.semester,
        subject: formData.subject,
        year: formData.year,
      };
      localStorage.setItem("projectData", JSON.stringify(dataToStore));
      navigate("/templates");
    } else {
      const dataToStore = {
        projectType: "group",
        stream: formData.stream,
        section: formData.section,
        group: formData.group,
        semester: formData.semester,
        subject: formData.subject,
        year: formData.year,
        topic: formData.topic,
        members: members,
      };
      localStorage.setItem("projectData", JSON.stringify(dataToStore));

      localStorage.setItem("selectedTemplate", "groupTemplate");
      navigate("/frontpreview");
    }
  };

  const semesterOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const streamOptions = [

    "B.TECH BT",
    "B.TECH CE",
    "B.TECH CSE",
    "B.TECH CSE-AI",
    "B.TECH CSE-DS",
    "B.TECH ECE",
    "B.TECH EE",
    "B.TECH CSBS",
    "B.TECH IT",
    "B.TECH ME",
    "B.TECH AIML",
    "B.TECH IOT",
    "B.TECH CYBER SECURITY",


    "B.ARCH",
    "B.DES",


    "B.PHARM",
    "D.PHARM",
    "M.PHARM",


    "B.COM",
    "B.COM HONOURS",
    "BBA",
    "MBA",
    "PGDM",


    "B.A ENGLISH",
    "B.A PSYCHOLOGY",
    "B.A JOURNALISM",
    "BA LLB",
    "BBA LLB",
    "LLB",
    "LLM",


    "B.SC BIOTECHNOLOGY",
    "B.SC DATA SCIENCE",
    "B.SC MICROBIOLOGY",
    "B.SC CHEMISTRY",
    "B.SC PHYSICS",
    "B.SC MATHEMATICS",
    "B.SC FORENSIC SCIENCE",
    "B.SC FOOD TECHNOLOGY",
    "B.SC AGRICULTURE",
    "B.SC ANIMATION & VFX",


    "BCA",
    "MCA",


    "M.TECH CSE",
    "M.TECH ECE",
    "M.TECH ME",
    "M.SC IT",
    "M.SC BIOTECHNOLOGY",
    "M.SC MICROBIOLOGY",
    "M.SC DATA SCIENCE",


    "DIPLOMA CSE",
    "DIPLOMA ECE",
    "DIPLOMA ME",
    "DIPLOMA CE",
    "DIPLOMA EE",


    "B.ED",
    "M.ED",
    "BJMC",
    "MJMC",
  ];

  const yearOptions = ["1st", "2nd", "3rd", "4th", "5th"];

  const isGroup = projectType === "group";

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

          {}
          <Box display="flex" justifyContent="center" mb={3}>
            <ToggleButtonGroup
              value={projectType}
              exclusive
              onChange={handleProjectTypeChange}
              aria-label="project type"
              sx={{
                "& .MuiToggleButton-root": {
                  px: { xs: 2, md: 4 },
                  py: 1,
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  textTransform: "none",
                  fontWeight: 500,
                },
                "& .Mui-selected": {
                  backgroundColor: "#007bff !important",
                  color: "#fff !important",
                  "&:hover": {
                    backgroundColor: "#0056b3 !important",
                  },
                },
              }}
            >
              <ToggleButton value="individual" aria-label="individual project">
                <PersonIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                Individual Project
              </ToggleButton>
              <ToggleButton value="group" aria-label="group project">
                <GroupsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                Group Project
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              {}
              {!isGroup && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                </>
              )}

              {}
              <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                  fullWidth
                  freeSolo
                  options={streamOptions}
                  value={formData.stream}
                  onChange={(event, newValue) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      stream: newValue || "",
                    }));
                  }}
                  onInputChange={(event, newInputValue, reason) => {
                    if (reason === 'input') {
                      setFormData((prevState) => ({
                        ...prevState,
                        stream: newInputValue,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Stream"
                      placeholder="Search, select, or type your own"
                      variant="outlined"
                      required
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Section (Optional)"
                  name="section"
                  placeholder="EX- BCS2E"
                  value={formData.section}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Group (Optional)"
                  name="group"
                  placeholder="EX- B"
                  value={formData.group}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
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
              <Grid size={{ xs: 12, md: 6 }}>
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

              <Grid size={{ xs: 12, md: 6 }}>
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

              {}
              {isGroup && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Topic"
                      name="topic"
                      placeholder="EX- Test cases for College Event Management System (CEMS)"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid size={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        mt: 1,
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    >
                      Team Members
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      Add all group members (minimum 2)
                    </Typography>

                    <Stack spacing={2}>
                      {members.map((member, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              minWidth: "24px",
                              fontWeight: 600,
                              color: "#666",
                            }}
                          >
                            {index + 1}.
                          </Typography>
                          <TextField
                            fullWidth
                            label={`Name`}
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(index, "name", e.target.value)
                            }
                            required
                            variant="outlined"
                            size="small"
                          />
                          <TextField
                            fullWidth
                            label={`Student ID`}
                            placeholder="Student ID"
                            value={member.studentId}
                            onChange={(e) =>
                              handleMemberChange(
                                index,
                                "studentId",
                                e.target.value
                              )
                            }
                            required
                            variant="outlined"
                            size="small"
                          />
                          <IconButton
                            onClick={() => removeMember(index)}
                            disabled={members.length <= 2}
                            color="error"
                            size="small"
                            aria-label={`Remove member ${index + 1}`}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>

                    <Button
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={addMember}
                      sx={{ mt: 2, textTransform: "none" }}
                      size="small"
                    >
                      Add Member
                    </Button>
                  </Grid>
                </>
              )}

              {}
              <Grid size={12}>
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

              <Grid size={12}>
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
                  {isGroup ? "Next: Preview" : "Next: Select Template"}
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
