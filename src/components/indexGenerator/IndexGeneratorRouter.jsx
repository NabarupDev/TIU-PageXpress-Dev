import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import IndexFormPage from './IndexFormPage';
import IndexTemplateSelectionPage from './IndexTemplateSelectionPage';
import IndexPreviewPage from './IndexPreviewPage';
import CssBaseline from '@mui/material/CssBaseline';
import FormPage from '../FormPage';
import TemplateSelection from '../TemplateSelection';
import PreviewPage from '../PreviewPage';
import HomeNavbar from '../HomeNavbar';
import Navbar from '../Navbar';
import HomePage from '../HomePage';
import GeneratePage from "../GeneratePage";
import HowItWorks from "../HowItWorks";
import WhyUseThis from "../WhyUseThis";
import Instructions from '../Instructions';
import Footer from '../Footer';
import GenFotter from '../GenFooter';
import ScrollToTop from '../ScrollToTop';

const IndexGeneratorRouter = () => {
  const [formData, setFormData] = useState({
    assignmentDescription: '',
    assignmentDate: '',
    submissionDate: '',
    signature: '',
    slNo: 1, // Default serial number
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setFormData(data);
    navigate('/select-template');
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    navigate('/indexpreview');
  };

  return (
    <>
      <ScrollToTop />
      <Box>
        <Routes>
          <Route path="/" element={
            <>
              <HomeNavbar />
              <HomePage />
              <GeneratePage />
              <HowItWorks />
              <WhyUseThis />
              <Instructions />
              <Footer />
            </>
          } />
          <Route path="/indexform" element={
            <>
              <Navbar />
              <IndexFormPage onSubmit={handleFormSubmit} initialData={formData} />
              <GenFotter />
            </>
          } />
          <Route
            path="/select-template" element={
              <>
                <Navbar />
                <IndexTemplateSelectionPage onTemplateSelect={handleTemplateSelect} />
                <GenFotter />
              </>
            }
          />
          <Route
            path="/indexpreview" element={
              <>
                <Navbar />
                <IndexPreviewPage formData={formData} templateType={selectedTemplate} />
                <GenFotter />
              </>}
          />
          <Route path="/frontpageform" element={
            <>
              <Navbar />
              <FormPage />
              <GenFotter />
            </>
          } />
          <Route path="/templates" element={
            <>
              <Navbar />
              <TemplateSelection />
              <GenFotter />
            </>
          } />
          <Route path="/frontpreview" element={
            <>
              <Navbar />
              <PreviewPage />
              <GenFotter />
            </>
          }
          />
        </Routes>
      </Box>
    </>
  );
};

export default IndexGeneratorRouter;