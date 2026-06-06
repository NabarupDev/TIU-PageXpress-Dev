import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableRow, TableHead, useMediaQuery, useTheme } from "@mui/material";
import technoIndiaLogo from "../../assets/techno-india-logo.png";

const GroupTemplate = ({ data, forceRender = false }) => {
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

    const {
        institution,
        stream,
        semester,
        subject,
        section,
        group,
        year,
        topic,
        members = [],
    } = data;

    return (
        <Box sx={{ width: "75%", height: "90%", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif", paddingTop: "50px", display: "flex", flexDirection: "column" }}>
            {}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={technoIndiaLogo}
                    alt="University Logo"
                    style={{ height: "80px" }}
                />
            </Box>

            {}
            <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: "3%", letterSpacing: "2px" }}>
                {institution || "TECHNO INDIA UNIVERSITY"}
            </Typography>

            {}
            <Typography variant="body2" sx={{ marginTop: "10px", marginBottom: "8%", letterSpacing: "1px" }}>
                EM 4, SECTOR V, SALT LAKE, KOLKATA – 700091, WEST BENGAL, INDIA
            </Typography>

            {}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "2%" }}>
                Subject: <span style={{ textDecoration: "underline" }}>{subject ? subject : ""}</span>
            </Typography>

            {}
            {topic && (
                <Typography variant="body1" sx={{ marginBottom: "15%", fontWeight: 500 }}>
                    Topic: {topic}
                </Typography>
            )}

            {}
            <Box sx={{ marginBottom: "15%", marginTop: topic ? "0" : "15%" }}>
                {group && (
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                        Group: {group.toUpperCase()}
                    </Typography>
                )}
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    SEMESTER: {semester ? semester.toUpperCase() : ""}
                </Typography>
                {section && (
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                        Department: {section.toUpperCase()}
                    </Typography>
                )}
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    STREAM: {stream || ""}
                </Typography>
                {year && (
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                        YEAR: {year.toUpperCase()}
                    </Typography>
                )}
            </Box>

            {}
            <Box sx={{ textAlign: "left", marginTop: "auto" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Prepared by:
                </Typography>

                <Table sx={{ width: "100%", border: "1px solid black" }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: "1px solid black", fontWeight: "bold", padding: "6px 10px", backgroundColor: "#f0f0f0", textDecoration: "underline" }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ border: "1px solid black", fontWeight: "bold", padding: "6px 10px", backgroundColor: "#f0f0f0", textDecoration: "underline" }}>
                                ID
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ border: "1px solid black", padding: "6px 10px" }}>
                                    {member.name || ""}
                                </TableCell>
                                <TableCell sx={{ border: "1px solid black", padding: "6px 10px" }}>
                                    {member.studentId || ""}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default GroupTemplate;
