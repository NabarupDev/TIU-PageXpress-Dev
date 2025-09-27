import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Container 
} from '@mui/material';
import jsPDF from 'jspdf';
import defaultIndex from '../../assets/default_index.jpg';

const IndexFormPage = ({ onSubmit, initialData = [] }) => {
  const [formData, setFormData] = useState(initialData.length > 0 ? initialData : [
    { assignmentDescription: '', assignmentDate: '', submissionDate: '', slNo: 1 }
  ]);

  const [errors, setErrors] = useState([]);

  const validateDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(dateString);
  };

  const validateForm = () => {
    const newErrors = formData.map((entry) => {
      let error = {};

      if (!entry.assignmentDescription.trim()) error.assignmentDescription = 'Assignment description is required';
      if (!entry.assignmentDate.trim()) {
        error.assignmentDate = 'Assignment date is required';
      } else if (!validateDate(entry.assignmentDate)) {
        error.assignmentDate = 'Date must be in DD-MM-YYYY format';
      }
      
      if (!entry.submissionDate.trim()) {
        error.submissionDate = 'Submission date is required';
      } else if (!validateDate(entry.submissionDate)) {
        error.submissionDate = 'Date must be in DD-MM-YYYY format';
      }

      return error;
    });

    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const formatDateInput = (value) => {
    // Remove any non-digit or non-hyphen characters
    let formattedValue = value.replace(/[^0-9]/g, '');

    // Automatically add hyphens in the correct places if the input is at the correct length
    if (formattedValue.length > 2 && formattedValue.length <= 4) {
      formattedValue = formattedValue.replace(/(\d{2})(\d{1,2})/, '$1-$2');
    } else if (formattedValue.length > 4) {
      formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1-$2-$3');
    }

    // Limit to 10 characters (DD-MM-YYYY format: 8 digits + 2 hyphens)
    return formattedValue.slice(0, 10);
  };

  const handleChange = (index, field, value) => {
    // For 'assignmentDescription', no limit is needed.
    if (field === 'assignmentDescription') {
      const updatedData = [...formData];
      updatedData[index][field] = value;
      setFormData(updatedData);
  
      // Store the updated form data in sessionStorage
      sessionStorage.setItem('formData', JSON.stringify(updatedData));
    }
  
    // For 'submissionDate' or 'assignmentDate', limit the input to 10 characters (DD-MM-YYYY format).
    if (field === 'submissionDate' || field === 'assignmentDate') {
      if (value.length <= 10) {
        value = formatDateInput(value); // Apply the date formatting
  
        const updatedData = [...formData];
        updatedData[index][field] = value;
        setFormData(updatedData);
  
        // Store the updated form data in sessionStorage
        sessionStorage.setItem('formData', JSON.stringify(updatedData));
      }
    }
  };
  

  const handleAddRow = () => {
    if (formData.length < 10) {
      const updatedData = [...formData, { assignmentDescription: '', assignmentDate: '', submissionDate: '', slNo: formData.length + 1 }];
      setFormData(updatedData);

      // Store the updated form data in sessionStorage
      sessionStorage.setItem('formData', JSON.stringify(updatedData));
    }
  };

  const handleRemoveRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    updatedData.forEach((item, i) => (item.slNo = i + 1)); // Reassign serial numbers
    setFormData(updatedData);

    // Store the updated form data in sessionStorage
    sessionStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);

      // Store the form data in sessionStorage when the form is submitted
      sessionStorage.setItem('formData', JSON.stringify(formData));
    }
  };

  // Retrieve the saved form data from sessionStorage when the component mounts
  React.useEffect(() => {
    const savedData = sessionStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const downloadJPG = () => {
    const link = document.createElement('a');
    link.href = defaultIndex;
    link.download = 'blank_index.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = (format) => {
    const img = new Image();
    img.src = defaultIndex;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      if (format === 'png') {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'blank_index.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/png');
      } else if (format === 'pdf') {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/jpeg');
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('blank_index.pdf');
      }
    };
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Project Index Page Generator
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          Fill in your project details to generate a professional index page.
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Or download a blank index page:</Typography>
          <Button variant="outlined" onClick={downloadJPG} sx={{ mr: 1 }}>JPG</Button>
          <Button variant="outlined" onClick={() => downloadImage('png')} sx={{ mr: 1 }}>PNG</Button>
          <Button variant="outlined" onClick={() => downloadImage('pdf')}>PDF</Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {formData.map((entry, index) => (
            <Paper key={index} sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Assignment {index + 1}</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
  name="assignmentDescription"
  label="Assignment Description"
  fullWidth
  multiline
  rows={2}
  value={entry.assignmentDescription}
  onChange={(e) => handleChange(index, 'assignmentDescription', e.target.value)}
  error={!!errors[index]?.assignmentDescription}
  helperText={errors[index]?.assignmentDescription}
  inputProps={{ maxLength: 500 }} // Limit to 500 characters
/>

                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="assignmentDate"
                    label="Assignment Date (DD-MM-YYYY)"
                    fullWidth
                    value={entry.assignmentDate}
                    onChange={(e) => handleChange(index, 'assignmentDate', e.target.value)}
                    placeholder="DD-MM-YYYY"
                    error={!!errors[index]?.assignmentDate}
                    helperText={errors[index]?.assignmentDate}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="submissionDate"
                    label="Submission Date (DD-MM-YYYY)"
                    fullWidth
                    value={entry.submissionDate}
                    onChange={(e) => handleChange(index, 'submissionDate', e.target.value)}
                    placeholder="DD-MM-YYYY"
                    error={!!errors[index]?.submissionDate}
                    helperText={errors[index]?.submissionDate}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="slNo"
                    label="Serial Number"
                    fullWidth
                    type="number"
                    value={entry.slNo}
                    InputProps={{ readOnly: true }}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    helperText="Auto-generated serial number"
                  />
                </Grid>
                {formData.length > 1 && (
                  <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Paper>
          ))}

          {/* Add More Button */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddRow}
              disabled={formData.length >= 10}
            >
              Add More
            </Button>
          </Box>

          {/* Submit Button */}
          <Grid container justifyContent="center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ minWidth: '200px' }}
            >
              Continue to Templates
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default IndexFormPage;
