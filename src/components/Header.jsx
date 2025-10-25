import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  Slide,
  Zoom,
  Chip,
  Badge,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  GitHub,
  LinkedIn,
  Email,
  Work,
  Code,
  ContactPage,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Header = ({ currentView }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const open = Boolean(anchorEl);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleMenuClose();
  };

  const getNavItems = () => {
    if (currentView === 'portfolio') {
      return [
        { label: 'Home', id: 'home', icon: <Work fontSize="small" /> },
        { label: 'About', id: 'about', icon: <Code fontSize="small" /> },
        { label: 'Projects', id: 'projects', icon: <Code fontSize="small" /> },
        { label: 'Contact', id: 'contact', icon: <ContactPage fontSize="small" /> },
      ];
    } else {
      return [
        { label: 'Back to Portfolio', id: 'home', special: true },
      ];
    }
  };

  const getSocialLinks = () => [
    { icon: <GitHub />, href: 'https://github.com/chamikamunithunga', label: 'GitHub' },
    { icon: <LinkedIn />, href: 'https://www.linkedin.com/in/chamika-munithunga-74801a2b1/', label: 'LinkedIn' },
    { icon: <Email />, href: 'mailto:munithungac@gmail.com', label: 'Email' },
  ];

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={600}>
      <AppBar 
        position="sticky" 
        elevation={scrolled ? 8 : 0}
        sx={{
          backgroundColor: scrolled 
            ? (isDarkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(14, 79, 176, 0.95)')
            : 'transparent',
          backgroundImage: scrolled && !isDarkMode
            ? 'linear-gradient(135deg,rgb(27, 193, 24) 0%,rgb(20, 89, 159) 50%,rgb(86, 121, 155) 100%)'
            : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: scrolled 
            ? (isDarkMode 
                ? `1px solid ${theme.palette.divider}` 
                : '1px solid rgba(102, 126, 234, 0.2)')
            : 'none',
          boxShadow: scrolled && !isDarkMode
            ? '0 4px 20px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(118, 75, 162, 0.08)'
            : scrolled && isDarkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : 'none',
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            py: scrolled ? 0.5 : 1.5,
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
            transition: 'padding 0.3s ease',
          }}
        >
          <Zoom in={true} timeout={800}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  '&:hover': {
                    transform: 'rotate(90deg)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                onClick={() => handleNavigation('home')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '3px',
                    bottom: -5,
                    left: 0,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                    backgroundSize: '200% 100%',
                    transform: 'scaleX(0)',
                    transformOrigin: 'right',
                    transition: 'transform 0.3s ease',
                    borderRadius: '2px',
                    animation: 'gradientShift 3s ease infinite',
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' },
                    },
                  },
                  '&:hover::before': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.5)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.3rem', md: '1.5rem' },
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.5px',
                    animation: 'gradientShift 3s ease infinite',
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' },
                    },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      filter: 'brightness(1.2)',
                      animation: 'gradientShift 1s ease infinite',
                    },
                  }}
                >
                  CHAMIKA.M
                </Typography>
              </Box>
              {!isSmallMobile && !isMobile && (
                <Chip 
                  label="✨ Full Stack Dev" 
                  size="small" 
                  sx={{ 
                    height: 28,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                    backgroundSize: '200% 200%',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    animation: 'gradientShift 3s ease infinite',
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' },
                    },
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                      animation: 'gradientShift 1s ease infinite',
                    },
                    transition: 'all 0.3s ease',
                  }} 
                />
              )}
            </Box>
          </Zoom>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getNavItems().map((item) => (
                  <Button
                    key={item.id}
                    color="inherit"
                    onClick={() => handleNavigation(item.id)}
                    startIcon={item.icon}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      px: { xs: 1.5, md: 2.5 },
                      py: { xs: 0.75, md: 1.25 },
                      position: 'relative',
                      color: isDarkMode ? '#FFFFFF' : '#1A202C',
                      backgroundColor: item.special 
                        ? (isDarkMode 
                            ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(156, 39, 176, 0.2))' 
                            : 'linear-gradient(135deg, rgba(33, 150, 243, 0.08), rgba(156, 39, 176, 0.08))')
                        : 'transparent',
                      border: item.special 
                        ? (isDarkMode 
                            ? `1px solid ${theme.palette.primary.main}60` 
                            : `1px solid ${theme.palette.primary.main}30`)
                        : '1px solid transparent',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: isDarkMode
                          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                          : 'linear-gradient(90deg, transparent, rgba(33,150,243,0.1), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover': {
                        backgroundColor: item.special 
                          ? (isDarkMode 
                              ? 'rgba(33, 150, 243, 0.3)' 
                              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15), rgba(240, 147, 251, 0.15), rgba(79, 172, 254, 0.15), rgba(0, 242, 254, 0.15))')
                          : (isDarkMode 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'rgba(102, 126, 234, 0.1)'),
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: item.special 
                          ? (isDarkMode 
                              ? '0 8px 20px rgba(33, 150, 243, 0.4)' 
                              : '0 8px 25px rgba(102, 126, 234, 0.35), 0 4px 10px rgba(240, 147, 251, 0.2)')
                          : (isDarkMode 
                              ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
                              : '0 6px 20px rgba(102, 126, 234, 0.2)'),
                        borderColor: item.special 
                          ? theme.palette.primary.main 
                          : (isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(102, 126, 234, 0.4)'),
                        '&::before': {
                          left: '100%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
            
            {/* Social Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1, pl: 2, borderLeft: `2px solid ${theme.palette.divider}30` }}>
                {getSocialLinks().map((link, index) => (
                  <Zoom in={true} timeout={900 + index * 100} key={index}>
                    <IconButton
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                      aria-label={link.label}
                      sx={{
                        position: 'relative',
                        color: isDarkMode ? '#FFFFFF' : '#1A202C',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.03)' 
                          : 'rgba(33, 150, 243, 0.05)',
                        '&:hover': {
                          transform: 'translateY(-4px) rotate(10deg)',
                          color: theme.palette.primary.main,
                          backgroundColor: isDarkMode 
                            ? 'rgba(33, 150, 243, 0.15)' 
                            : 'rgba(33, 150, 243, 0.12)',
                          boxShadow: isDarkMode
                            ? '0 6px 20px rgba(33, 150, 243, 0.3)'
                            : '0 6px 20px rgba(33, 150, 243, 0.25)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          padding: '2px',
                          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.5), transparent)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        },
                        '&:hover::after': {
                          opacity: 1,
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </Zoom>
                ))}
              </Box>
            )}
            
            {/* Theme Toggle */}
            <Zoom in={true} timeout={1000}>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label="toggle theme"
                sx={{
                  position: 'relative',
                  color: isDarkMode ? '#FFFFFF' : '#1A202C',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))'
                    : 'linear-gradient(135deg, rgba(33, 150, 243, 0.08), rgba(156, 39, 176, 0.08))',
                  border: `1px solid ${isDarkMode ? theme.palette.divider : 'rgba(33, 150, 243, 0.2)'}`,
                  '&:hover': {
                    transform: 'rotate(180deg) scale(1.1)',
                    background: isDarkMode
                      ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(156, 39, 176, 0.2))'
                      : 'linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(156, 39, 176, 0.15))',
                    boxShadow: isDarkMode
                      ? '0 4px 20px rgba(33, 150, 243, 0.3)'
                      : '0 4px 20px rgba(33, 150, 243, 0.25)',
                  },
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Zoom>
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '16px',
                mt: 1,
                minWidth: 200,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {getNavItems().map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                sx={{
                  color: theme.palette.text.primary,
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'translateX(5px)',
                  },
                }}
              >
                {item.icon && <Box sx={{ mr: 2 }}>{item.icon}</Box>}
                {item.label}
              </MenuItem>
            ))}
            
            {/* Social Links in Mobile Menu */}
            <Box sx={{ px: 2, py: 1, borderTop: `1px solid ${theme.palette.divider}`, display: 'flex', gap: 1 }}>
              {getSocialLinks().map((link, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
