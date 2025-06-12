import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import technoIndiaLogo from "../../assets/techno-india-logo.png";

const Template2 = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Show warning message on mobile devices
    if (isMobile) {
        return (
            <Box sx={{ textAlign: "center", marginTop: "20%", padding: "20px" }}>
                <Typography variant="h6" color="error">
                    ⚠ Please visit our website using a desktop for a better experience or use desktop mode.
                </Typography>
            </Box>
        );
    }

    const formData = data; // Ensure compatibility
    const { institution, studentId, name, stream, semester, subject, section, group, year } = formData;

    return (
        <Box sx={{ width: "75%", height: "90%", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif", paddingTop: "50px" }}>
            {/* University Logo */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={technoIndiaLogo}
                    alt="University Logo"
                    style={{ height: "80px" }}
                />
            </Box>

            {/* University Name */}
            <Typography variant="h4" marginTop={"5%"} sx={{ fontWeight: "bold" }}>
                {institution || "TECHNO INDIA UNIVERSITY"}
            </Typography>

            {/* Location */}
            <Typography variant="body2" sx={{ marginTop: "10px", marginBottom: "30%" }}>
                EM 4, SECTOR V, SALT LAKE, KOLKATA - 700091, WEST BENGAL, INDIA
            </Typography>

            {/* Subject Title */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "40%", marginTop: "30%" }}>
                Subject: <span style={{ textDecoration: "underline" }}>{subject ? subject.toUpperCase() : "SUBJECT"}</span>
            </Typography>

            {/* Student Details */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", textAlign: "left", width: "60%", margin: "auto" }}>
                {renderDetail("STUDENT ID", studentId)}
                {renderDetail("NAME", name)}
                {renderDetail("DEPARTMENT", section ? `${section.toUpperCase()} (GROUP - ${group.toUpperCase()})` : stream)}
                {renderDetail("SEMESTER", semester ? semester.toUpperCase() + " SEMESTER" : "")}
                {renderDetail("STREAM", stream)}
                {renderDetail("YEAR", year)}
            </Box>
        </Box>
    );
};

// Function to render details in a structured format
const renderDetail = (label, value) => (
    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
        <strong>{label}:</strong> {value}
    </Typography>
);

export default Template2;
