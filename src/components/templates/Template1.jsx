import React from "react";
import { Box, Typography, Grid, Table, TableBody, TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material";
import technoIndiaLogo from "../../assets/techno-india-logo.png";

const Template1 = ({ data, forceRender = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  if (isMobile && !forceRender) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20%", padding: "20px" }}>
        <Typography variant="h6" color="error">
          ⚠ Please visit our website using a desktop for a better experience or use desktop mode.
        </Typography>
      </Box>
    );
  }

  const formData = data;
  const { institution, section, stream, group } = formData;
  

  return (
    <Box sx={{ width: "75%", height: "90%", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {}
      <Box sx={{ alignContent: "start" }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {}
          <Grid>
            <img
              src={technoIndiaLogo}
              alt="Logo"
              style={{ height: "50px" }}
            />
          </Grid>

          {}
          <Grid>
            <Typography variant="h5" sx={{ fontWeight: "bold", textDecoration: "underline" }}>
              {institution || "TECHNO INDIA UNIVERSITY"}
            </Typography>

            <Typography variant="h6">WEST BENGAL</Typography>
          </Grid>
        </Grid>

        {}
        <Typography variant="body2" sx={{ marginTop: "10px", marginBottom: "20px" }}>
          EM 4, SECTOR V, SALT LAKE, KOLKATA - 700091, WEST BENGAL, INDIA
        </Typography>
      </Box>

      {}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "40%", marginTop: "40%" }}>
        Subject: <span style={{ textDecoration: "underline" }}>{formData.subject ? formData.subject.toUpperCase() : ""}</span>
      </Typography>

      {}
      <Table sx={{ width: "100%", border: "1px solid black", marginTop: "20px" }}>
        <TableBody>
          {renderRow("STUDENT ID", formData.studentId || "")}
          {renderRow("NAME", formData.name || "")}
          {(section || group) && renderRow("DEPARTMENT", `${section ? section.toUpperCase() : ''}${section && group ? ` (GROUP - ${group.toUpperCase()})` : group ? `GROUP - ${group.toUpperCase()}` : ''}`)}
          {renderRow("SEMESTER", formData.semester ? formData.semester.toUpperCase() + " SEMESTER" : "")}
          {renderRow("STREAM", formData.stream || "")}
          {renderRow("YEAR", formData.year || "")}
        </TableBody>
      </Table>
    </Box>
  );
};


const renderRow = (label, value) => (
  <TableRow>
    <TableCell sx={{ border: "1px solid black", padding: "10px", fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
      {label}
    </TableCell>
    <TableCell sx={{ border: "1px solid black", padding: "10px" }}>{value}</TableCell>
  </TableRow>
);

export default Template1;
