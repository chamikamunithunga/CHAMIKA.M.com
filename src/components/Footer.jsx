import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  ArrowUpward,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
          <Box sx={{ flex: { xs: '100%', md: '1' }, minWidth: { md: '300px' } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
              }}
            >
              Modern Web
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Building the future of web development with modern technologies,
              beautiful design, and exceptional user experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="primary"
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
              <IconButton
                color="primary"
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                color="primary"
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="primary"
                component="a"
                href="mailto:contact@example.com"
              >
                <Email />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ minWidth: { xs: '150px', sm: '200px' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                Features
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Pricing
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Documentation
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                API
              </Link>
            </Box>
          </Box>
          
          <Box sx={{ minWidth: { xs: '150px', sm: '200px' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                About
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Blog
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Careers
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Box>
          </Box>
          
          <Box sx={{ minWidth: { xs: '150px', sm: '200px' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                Help Center
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Community
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Status
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Privacy
              </Link>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Modern Web. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Terms
            </Link>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Privacy
            </Link>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
      
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          zIndex: 1000,
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default Footer;
