import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import { GitHub, LinkedIn, Email, ArrowUpward } from '@mui/icons-material';

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
        {/* Top Section */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between',
          }}
        >
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
              CHAMIKA.M
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Building the future of web development with modern technologies,
              beautiful design, and exceptional user experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="primary"
                component="a"
                href="https://github.com/chamikamunithunga"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
              <IconButton
                color="primary"
                component="a"
                href="https://www.linkedin.com/in/chamika-munithunga-74801a2b1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" component="a" href="mailto:munithungac@gmail.com">
                <Email />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
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
            © 2025 CHAMIKA.M. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Scroll to Top Button */}
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
