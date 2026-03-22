import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import IndexFormPage from './IndexFormPage';
import IndexTemplateSelectionPage from './IndexTemplateSelectionPage';
import IndexPreviewPage from './IndexPreviewPage';
import CssBaseline from '@mui/material/CssBaseline';
import FormPage from '../pages/FormPage';
import TemplateSelection from '../pages/TemplateSelection';
import PreviewPage from '../pages/PreviewPage';
import HomeNavbar from '../layout/HomeNavbar';
import Navbar from '../layout/Navbar';
import HomePage from '../pages/HomePage';
import GeneratePage from "../pages/GeneratePage";
import HowItWorks from "../sections/HowItWorks";
import WhyUseThis from "../sections/WhyUseThis";
import Instructions from '../sections/Instructions';
import Footer from '../layout/Footer';
import GenFotter from '../layout/GenFooter';
import ScrollToTop from '../common/ScrollToTop';

const IndexGeneratorRouter = () => {
  const [formData, setFormData] = useState([
    { assignmentDescription: '', assignmentDate: '', submissionDate: '', slNo: 1 }
  ]);
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