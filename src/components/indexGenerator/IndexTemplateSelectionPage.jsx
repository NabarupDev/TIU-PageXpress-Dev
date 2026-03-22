import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 1, name: 'Classic Style', image: 'https://raw.githubusercontent.com/random-derv/images/refs/heads/main/clasic.jpg', type: 'classic' },
  { id: 2, name: 'Modern Style', image: 'https://raw.githubusercontent.com/random-derv/images/refs/heads/main/mordern.jpg', type: 'modern' },
  { id: 3, name: 'Minimalist Style', image: 'https://raw.githubusercontent.com/random-derv/images/refs/heads/main/minimalist.jpg', type: 'minimalist' }
];


const IndexTemplateSelectionPage = ({ onTemplateSelect }) => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (templateType) => {
    setSelectedId(templateType.id);
    onTemplateSelect(templateType.type);
  };

  const handleBack = () => {
    navigate('/indexform');
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Select Template
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Choose a template design for your index page
        </Typography>

        <Grid container spacing={4}>
          {templates.map((template) => (
            <Grid size={{ xs: 12, md: 4 }} key={template.id}>
              <Card
                onClick={() => handleSelect(template)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedId === template.id ? 'translateY(-5px)' : 'none',
                  boxShadow: selectedId === template.id ? '0 10px 20px rgba(0,0,0,0.2)' : '',
                  border: selectedId === template.id ? '2px solid #1976d2' : 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={template.image}  // Use the image URL directly
                  alt={template.name}
                  sx={{ objectFit: 'contain' }}  // Ensures the image is contained within the box without overflow
                />

                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{template.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ minWidth: '120px' }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedId}
            onClick={() => navigate('/indexpreview')}
            sx={{ minWidth: '120px' }}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default IndexTemplateSelectionPage;