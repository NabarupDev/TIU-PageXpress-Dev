import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Divider, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// Helper function to get the data from localStorage
const getStoredData = () => {
  const savedData = localStorage.getItem('formData');
  return savedData ? JSON.parse(savedData) : [];
};

// Classic Template
export const ClassicTemplate = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(getStoredData());
  }, []);

  const totalRows = 10;
  const emptyRows = totalRows - formData.length;
  const displayData = [...formData, ...Array(emptyRows).fill({})];

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: '#fff',
        border: '2px solid black',
        borderRadius: 2,
        width: '210mm', // A4 Width
        height: '297mm', // A4 Height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: 3,
          fontFamily: 'serif', // Classic Font Style
          letterSpacing: 1.5
        }}
      >
        PROJECT INDEX
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ flexGrow: 1, boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650, borderCollapse: 'collapse', height: '100%' }} aria-label="classic project index table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d9d9d9' }}>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center', width: '10%', fontFamily: 'serif' }}>Sl No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center', width: '40%', fontFamily: 'serif' }}>Assignment Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center', width: '15%', fontFamily: 'serif' }}>Assignment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center', width: '15%', fontFamily: 'serif' }}>Submission Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center', width: '20%', fontFamily: 'serif' }}>Signature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={index} sx={{ height: '10%', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell sx={{ border: '2px solid black', textAlign: 'center', fontFamily: 'serif' }}>{row.assignmentDescription ? index + 1 : ''}</TableCell>
                <TableCell sx={{ border: '2px solid black', textAlign: 'left', fontFamily: 'serif' }}>{row.assignmentDescription || ''}</TableCell>
                <TableCell sx={{ border: '2px solid black', textAlign: 'center', fontFamily: 'serif' }}>{row.assignmentDate || ''}</TableCell>
                <TableCell sx={{ border: '2px solid black', textAlign: 'center', fontFamily: 'serif' }}>{row.submissionDate || ''}</TableCell>
                <TableCell sx={{ border: '2px solid black', textAlign: 'center' }}>{/* Empty space for signature */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Modern Template
export const ModernTemplate = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(getStoredData());
  }, []);

  const totalRows = 10;
  const emptyRows = totalRows - formData.length;
  const displayData = [...formData, ...Array(emptyRows).fill({})];

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#fff',
        border: '1px solid #eaeaea',
        borderRadius: 2,
        width: '210mm', // A4 Width
        height: '297mm', // A4 Height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', mb: 3 }}
      >
        INDEX
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table sx={{ minWidth: 650, borderCollapse: 'collapse', height: '100%' }} aria-label="project index table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', width: '10%' }}>Sl No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', width: '40%' }}>Assignment Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', width: '15%' }}>Assignment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', width: '15%' }}>Submission Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', width: '20%' }}>Signature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={index} sx={{ height: '10%' }}>
                <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{row.assignmentDescription ? index + 1 : ''}</TableCell>
                <TableCell sx={{ border: '1px solid black', textAlign: 'left' }}>{row.assignmentDescription || ''}</TableCell>
                <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{row.assignmentDate || ''}</TableCell>
                <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{row.submissionDate || ''}</TableCell>
                <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{/* Empty space for signature */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Minimalist Template
export const MinimalistTemplate = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(getStoredData());
  }, []);

  const totalRows = 10;
  const emptyRows = totalRows - formData.length;
  const displayData = [...formData, ...Array(emptyRows).fill({})];

  return (
    <Box
      sx={{
        p: 5,
        backgroundColor: '#fff',
        width: '210mm', // A4 Width
        height: '297mm', // A4 Height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: '500',
          textTransform: 'uppercase',
          mb: 3,
          letterSpacing: 1.2
        }}
      >
        Index
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ flexGrow: 1, boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650, borderCollapse: 'collapse', height: '100%' }} aria-label="minimalist project index table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  width: '10%',
                  border: '1px solid #ccc', // Column Border
                }}
              >
                Sl No.
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  width: '40%',
                  border: '1px solid #ccc', // Column Border
                }}
              >
                Assignment Description
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  width: '15%',
                  border: '1px solid #ccc', // Column Border
                }}
              >
                Assignment Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  width: '15%',
                  border: '1px solid #ccc', // Column Border
                }}
              >
                Submission Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  width: '20%',
                  border: '1px solid #ccc', // Column Border
                }}
              >
                Signature
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={index} sx={{ height: '10%' }}>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    border: '1px solid #ccc', // Column Border
                  }}
                >
                  {row.assignmentDescription ? index + 1 : ''}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'left',
                    border: '1px solid #ccc', // Column Border
                  }}
                >
                  {row.assignmentDescription || ''}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    border: '1px solid #ccc', // Column Border
                  }}
                >
                  {row.assignmentDate || ''}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    border: '1px solid #ccc', // Column Border
                  }}
                >
                  {row.submissionDate || ''}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    border: '1px solid #ccc', // Column Border
                  }}
                >
                  {/* Empty space for signature */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

