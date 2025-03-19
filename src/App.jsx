import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import IndexGeneratorRouter from './components/indexGenerator/IndexGeneratorRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IndexGeneratorRouter />
    </ThemeProvider>
  );
}

export default App; 