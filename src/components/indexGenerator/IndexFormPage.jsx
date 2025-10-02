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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import defaultIndex from '../../assets/default_index.jpg';const IndexFormPage = ({ onSubmit, initialData = [] }) => {
  const [formData, setFormData] = useState(() => {
    if (initialData.length > 0) {
      // Convert any string dates to dayjs objects
      return initialData.map(item => ({
        ...item,
        assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate) : null,
        submissionDate: item.submissionDate ? dayjs(item.submissionDate) : null
      }));
    }
    return [{ assignmentDescription: '', assignmentDate: null, submissionDate: null, slNo: 1 }];
  });

  const [errors, setErrors] = useState([]);

  // Date constraints
  const maxDate = dayjs().add(1, 'year');

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

  const validateDate = (dateString) => {
    return dayjs(dateString).isValid();
  };

  const validateForm = () => {
    const newErrors = formData.map((entry) => {
      let error = {};

      if (!entry.assignmentDescription.trim()) error.assignmentDescription = 'Assignment description is required';
      if (!entry.assignmentDate) {
        error.assignmentDate = 'Assignment date is required';
      }
      
      if (!entry.submissionDate) {
        error.submissionDate = 'Submission date is required';
      }

      return error;
    });

    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };  const formatDateInput = (value) => {
    // This function is no longer needed with date pickers
    return value;
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

    // For date fields, handle dayjs objects
    if (field === 'submissionDate' || field === 'assignmentDate') {
      const updatedData = [...formData];
      updatedData[index][field] = value;
      setFormData(updatedData);

      // Store the updated form data in sessionStorage (convert dates to ISO strings)
      const dataToStore = updatedData.map(item => ({
        ...item,
        assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate).toISOString() : null,
        submissionDate: item.submissionDate ? dayjs(item.submissionDate).toISOString() : null
      }));
      sessionStorage.setItem('formData', JSON.stringify(dataToStore));
    }
  };


  const handleAddRow = () => {
    if (formData.length < 10) {
      const updatedData = [...formData, { assignmentDescription: '', assignmentDate: null, submissionDate: null, slNo: formData.length + 1 }];
      setFormData(updatedData);

      // Store the updated form data in sessionStorage
      const dataToStore = updatedData.map(item => ({
        ...item,
        assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate).toISOString() : null,
        submissionDate: item.submissionDate ? dayjs(item.submissionDate).toISOString() : null
      }));
      sessionStorage.setItem('formData', JSON.stringify(dataToStore));
    }
  };

  const handleRemoveRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    updatedData.forEach((item, i) => (item.slNo = i + 1)); // Reassign serial numbers
    setFormData(updatedData);

    // Store the updated form data in sessionStorage
    const dataToStore = updatedData.map(item => ({
      ...item,
      assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate).toISOString() : null,
      submissionDate: item.submissionDate ? dayjs(item.submissionDate).toISOString() : null
    }));
    sessionStorage.setItem('formData', JSON.stringify(dataToStore));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert dates to DD-MM-YYYY format for submission
      const formattedData = formData.map(item => ({
        ...item,
        assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate).format('DD-MM-YYYY') : '',
        submissionDate: item.submissionDate ? dayjs(item.submissionDate).format('DD-MM-YYYY') : ''
      }));
      onSubmit(formattedData);

      // Store the form data in sessionStorage when the form is submitted
      const dataToStore = formData.map(item => ({
        ...item,
        assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate).toISOString() : null,
        submissionDate: item.submissionDate ? dayjs(item.submissionDate).toISOString() : null
      }));
      sessionStorage.setItem('formData', JSON.stringify(dataToStore));
    }
  };

  // Retrieve the saved form data from sessionStorage when the component mounts
  React.useEffect(() => {
    // Only restore if initialData is empty (to avoid conflicts)
    if (initialData.length === 0) {
      const savedData = sessionStorage.getItem('formData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert ISO strings back to dayjs objects
        const restoredData = parsedData.map(item => ({
          ...item,
          assignmentDate: item.assignmentDate ? dayjs(item.assignmentDate) : null,
          submissionDate: item.submissionDate ? dayjs(item.submissionDate) : null
        }));
        setFormData(restoredData);
      }
    }
  }, [initialData]);

  const downloadJPG = async () => {
    const link = document.createElement('a');
    link.href = defaultIndex;
    link.download = 'blank_index.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Increment download counter
    await incrementDownloadCount();
  };

  const downloadImage = async (format) => {
    const img = new Image();
    img.src = defaultIndex;
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      if (format === 'png') {
        canvas.toBlob(async (blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'blank_index.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          // Increment download counter
          await incrementDownloadCount();
        }, 'image/png');
      } else if (format === 'pdf') {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/jpeg');
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('blank_index.pdf');

        // Increment download counter
        await incrementDownloadCount();
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    <DatePicker
                      label="Assignment Date"
                      value={entry.assignmentDate}
                      onChange={(newValue) => handleChange(index, 'assignmentDate', newValue)}
                      format="DD-MM-YYYY"
                      maxDate={maxDate}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors[index]?.assignmentDate,
                          helperText: errors[index]?.assignmentDate || 'Max 1 year from today'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Submission Date"
                      value={entry.submissionDate}
                      onChange={(newValue) => handleChange(index, 'submissionDate', newValue)}
                      format="DD-MM-YYYY"
                      maxDate={maxDate}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors[index]?.submissionDate,
                          helperText: errors[index]?.submissionDate || 'Max 1 year from today'
                        }
                      }}
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
          </LocalizationProvider>

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
