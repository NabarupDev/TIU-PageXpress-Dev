import React, { useRef, useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Grid, 
  Menu, 
  MenuItem,
  Tooltip,
  CircularProgress
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ClassicTemplate, ModernTemplate, MinimalistTemplate } from './IndexTemplateComponents';

// Function to check if user is on a mobile device
const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
};

const IndexPreviewPage = ({ formData, templateType }) => {
  const previewRef = useRef(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [isMobile, setIsMobile] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const open = Boolean(anchorEl);
  const menuId = 'index-save-options-menu';

  // API Ninjas Counter configuration
  const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY;
  const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/counter';
  const COUNTER_ID = import.meta.env.VITE_COUNTER_ID;

  useEffect(() => {
    setIsMobile(isMobileDevice()); // Check if the user is on mobile
  }, []);

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

  // Handle dropdown open & close
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const downloadAsFile = async (format) => {
    handleCloseMenu(); // Close menu after selecting format
    setIsGenerating(true);

    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`);

      if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('index-page.pdf');
      } else {
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `index-page.${format}`;
        link.click();
      }
      
      // Increment download counter
      await incrementDownloadCount();
    } catch (error) {
      // console.error(`Error saving as ${format}:`, error);
      alert(`Error saving as ${format}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Renders the selected template
  const renderTemplate = () => {
    switch(templateType) {
      case 'classic': return <ClassicTemplate formData={formData} />;
      case 'modern': return <ModernTemplate formData={formData} />;
      case 'minimalist': return <MinimalistTemplate formData={formData} />;
      default: return <ClassicTemplate formData={formData} />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Preview & Save
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Here's a preview of your index page. Choose a format to save it.
        </Typography>

        {/* Preview Box - Either Template Preview or Mobile Warning */}
        <Box 
          ref={previewRef} 
          sx={{ 
            width: '100%',
            maxWidth: '800px',
            minHeight: '600px',
            margin: '0 auto',
            mb: 4,
            border: '1px solid #eaeaea',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isMobile ? '#ffebee' : '#fff', // Light red background if mobile
          }}
        >
          {isMobile ? (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', p: 3 }}>
              ⚠ Please visit our website using a desktop for a better experience or enable "Desktop Mode" in your browser.
            </Typography>
          ) : (
            renderTemplate()
          )}
        </Box>

        {/* Buttons */}
        <Grid container justifyContent="space-between" sx={{ mt: 4 }}>
          <Grid item>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/select-template')}
              sx={{ minWidth: '120px' }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            {/* Save As Button with Dropdown - Updated to match PreviewPage */}
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
                sx={{ minWidth: '120px' }}
              >
                {isGenerating ? <CircularProgress size={20} /> : 'Save As'}
              </Button>
            </Tooltip>

            {/* Dropdown Menu - Updated to match PreviewPage */}
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
                'aria-labelledby': 'index-save-options-menu',
                autoFocusItem: false,
              }}
              disableAutoFocusItem
            >
              <MenuItem onClick={() => downloadAsFile('pdf')}>Save as PDF</MenuItem>
              <MenuItem onClick={() => downloadAsFile('png')}>Save as PNG</MenuItem>
              <MenuItem onClick={() => downloadAsFile('jpg')}>Save as JPG</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default IndexPreviewPage;
