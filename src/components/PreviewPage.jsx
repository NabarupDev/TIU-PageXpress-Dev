import React, { useRef, useState } from 'react';
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
  Tooltip
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';

const PreviewPage = () => {
  const navigate = useNavigate();
  const projectData = JSON.parse(localStorage.getItem('projectData') || '{}');
  const selectedTemplate = localStorage.getItem('selectedTemplate');
  const contentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuId = 'save-options-menu';

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
    } catch (error) {
      console.error('Error generating PDF:', error);
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
    } catch (error) {
      console.error(`Error saving ${format}:`, error);
      alert(`Error saving as ${format}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1': return <Template1 data={projectData} />;
      case 'template2': return <Template2 data={projectData} />;
      case 'template3': return <Template3 data={projectData} />;
      default: return <Typography>No template selected</Typography>;
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Preview Your Front Page
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
            Review and download your project front page.
          </Typography>

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
              justifyContent: 'center'
            }}
          >
            {renderTemplate()}
          </Box>

          <Stack spacing={2} direction="row" justifyContent="center">
            {/* Back Button */}
            <Button 
              variant="outlined" 
              color="secondary"  
              onClick={() => navigate('/templates')}
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
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
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
