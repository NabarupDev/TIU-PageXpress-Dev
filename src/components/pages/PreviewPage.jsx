import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  CircularProgress,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

const PreviewPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const projectData = JSON.parse(localStorage.getItem('projectData') || '{}');
  const selectedTemplate = localStorage.getItem('selectedTemplate');
  const contentRef = useRef(null);
  const mobilePreviewWrapperRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileScale, setMobileScale] = useState(0.4);

  // Calculate scale for mobile preview based on container width
  const updateMobileScale = useCallback(() => {
    if (mobilePreviewWrapperRef.current) {
      const containerWidth = mobilePreviewWrapperRef.current.offsetWidth;
      setMobileScale(containerWidth / 794);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    updateMobileScale();
    window.addEventListener('resize', updateMobileScale);
    return () => window.removeEventListener('resize', updateMobileScale);
  }, [isMobile, updateMobileScale]);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuId = 'save-options-menu';

  // API Ninjas Counter configuration
  const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY;
  const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/counter';
  const COUNTER_ID = import.meta.env.VITE_COUNTER_ID;

  // Increment download count
  const incrementDownloadCount = async () => {
    try {
      await fetch(`${API_NINJAS_BASE_URL}?id=${COUNTER_ID}&hit=true`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_NINJAS_KEY
        }
      });
    } catch (error) {
      // Silently fail - don't block the download
      // console.warn('Could not update download counter:', error.message);
    }
  };

  if (!projectData.name || !selectedTemplate) {
    navigate(!projectData.name ? '/' : '/templates');
    return null;
  }

  // Open menu on click only (not hover)
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const generatePDF = async () => {
    handleCloseMenu();
    if (!contentRef.current) return;
    setIsGenerating(true);
  
    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('front_page.pdf');
      // Increment download counter
      await incrementDownloadCount();
    } catch (error) {
      // console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async (format) => {
    handleCloseMenu();
    if (!contentRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true });
      const imageData = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `front_page.${format}`;
      link.click();
      // Increment download counter
      await incrementDownloadCount();
    } catch (error) {
      // console.error(`Error saving ${format}:`, error);
      // alert(`Error saving as ${format}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1': return <Template1 data={projectData} forceRender />;
      case 'template2': return <Template2 data={projectData} forceRender />;
      case 'template3': return <Template3 data={projectData} forceRender />;
      default: return <Typography>No template selected</Typography>;
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
            Preview Your Front Page
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
            Review and download your project front page.
          </Typography>

          {/* 
            On mobile: off-screen container at fixed A4 size for html2canvas capture,
            plus a visible scaled-down preview the user can see.
            On desktop: single visible preview that also serves as the capture target.
          */}

          {isMobile ? (
            <>
              {/* Hidden off-screen render at full A4 size for accurate downloads */}
              <Box 
                ref={contentRef} 
                sx={{
                  position: 'fixed',
                  left: '-9999px',
                  top: 0,
                  width: '794px',
                  height: '1123px',
                  padding: '32px',
                  backgroundColor: '#fff',
                  zIndex: -1,
                  overflow: 'hidden',
                }}
              >
                {renderTemplate()}
              </Box>

              {/* Visible scaled-down preview for mobile */}
              <Box 
                ref={mobilePreviewWrapperRef}
                sx={{ 
                  my: 3, 
                  border: '1px solid #ddd', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  width: '100%',
                  aspectRatio: '1/1.414',
                }}
              >
                <Box
                  sx={{
                    width: '794px',
                    height: '1123px',
                    transform: `scale(${mobileScale})`,
                    transformOrigin: 'top left',
                    padding: '32px',
                  }}
                >
                  {renderTemplate()}
                </Box>
              </Box>
            </>
          ) : (
            /* Desktop: visible inline preview, also used for capture */
            <Box 
              ref={contentRef} 
              sx={{ 
                my: 4, 
                p: 4, 
                border: '1px solid #ddd', 
                borderRadius: 2, 
                backgroundColor: '#fff',
                width: '100%',
                aspectRatio: '1/1.414', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderTemplate()}
            </Box>
          )}

          <Stack spacing={2} direction="row" justifyContent="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {/* Back Button */}
            <Button 
              variant="outlined" 
              color="secondary"  
              onClick={() => navigate('/templates')}
              size={isMobile ? "small" : "medium"}
            >
              Back to Templates
            </Button>

            {/* Save As Button with Dropdown */}
            <Tooltip title="Click to see save options">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenMenu}
                disabled={isGenerating}
                endIcon={<ArrowDropDownIcon />}
                startIcon={isMobile ? <DownloadIcon /> : undefined}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size={isMobile ? "small" : "medium"}
              >
                {isGenerating ? <CircularProgress size={20} /> : 'Save As'}
              </Button>
            </Tooltip>

            <Menu
              id={menuId}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              MenuListProps={{
                'aria-labelledby': 'save-options-menu',
                autoFocusItem: false,
              }}
              disableAutoFocusItem
            >
              <MenuItem onClick={generatePDF}>Save as PDF</MenuItem>
              <MenuItem onClick={() => downloadImage('png')}>Save as PNG</MenuItem>
              <MenuItem onClick={() => downloadImage('jpg')}>Save as JPG</MenuItem>
            </Menu>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default PreviewPage;
