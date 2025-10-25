import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button, Grid } from '@mui/material';
import { CustomThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import AnimatedHome from './components/AnimatedHome';
import AnimatedAbout from './components/AnimatedAbout';
import AnimatedProjects from './components/AnimatedProjects';
import AnimatedContact from './components/AnimatedContact';
import Footer from './components/Footer';


function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio', 'games', 'game-selector', specific game

  const handleGameSelect = (gameId) => {
    if (gameId === 'menu') {
      setCurrentView('portfolio');
    } else {
      setCurrentView(gameId);
    }
  };

  const handleNavigate = (sectionId) => {
    if (sectionId === 'home') {
      setCurrentView('portfolio');
    } else {
      // Scroll to section in portfolio
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'portfolio':
        return (
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              width: '100%',
              overflowX: 'hidden',
              minHeight: '100vh',
            }}
          >
            <AnimatedHome />
            <AnimatedAbout />
            <AnimatedProjects />
            <AnimatedContact />
            <Footer />
          </Box>
        );
      default:
        return (
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              width: '100%',
              overflowX: 'hidden',
              minHeight: '100vh',
            }}
          >
            <AnimatedHome />
            <AnimatedAbout />
            <AnimatedProjects />
            <AnimatedContact />
            <Footer />
          </Box>
        );
    }
  };

  return (
    <CustomThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Header currentView={currentView} />
        {renderCurrentView()}
      </Box>
    </CustomThemeProvider>
  );
}

export default App;
