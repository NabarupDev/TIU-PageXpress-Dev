import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box
            id="footer-section"
            component="footer"
            sx={{ backgroundColor: "#F5F7FA", py: 4, mt: 4 }}
        >
            <Container maxWidth="lg">
                {/* Copyright Text */}
                <Typography
                    variant="body2"
                    color="gray"
                    align="center"
                    sx={{ fontSize: "14px"}}
                >
                    © {new Date().getFullYear()} Nabarup Roy. All rights reserved.
                    <br />
                    TIU PageXpress - Created by Nabarup Roy
                </Typography>

                {/* Contact Email */}
                <Typography
                    variant="body2"
                    color="gray"
                    align="center"
                    sx={{ fontSize: "14px", mt: 2 }}
                >
                    If you're facing any issues, feel free to reach out to us via email at{" "}
                    <Link href="mailto:nabaruproy.dev@gmail.com" sx={{ color: "gray", fontWeight: 500 }}>
                        nabaruproy.dev@gmail.com
                    </Link>
                </Typography>

                {/* Social Media Links */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                    <IconButton
                        component="a"
                        href="https://github.com/NabarupDev"
                        target="_blank"
                        sx={{ color: "black" }}
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/nabarup-roy/"
                        target="_blank"
                        sx={{ color: "black" }}
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
