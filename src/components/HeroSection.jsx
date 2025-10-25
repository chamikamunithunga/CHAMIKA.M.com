import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import {
  RocketLaunch,
  Palette,
  Speed,
  Security,
  Code,
  Devices,
} from '@mui/icons-material';

const HeroSection = () => {
  const theme = useTheme();

  const features = [
    { icon: <RocketLaunch />, title: 'Fast Performance', description: 'Lightning-fast load times' },
    { icon: <Palette />, title: 'Beautiful Design', description: 'Modern and intuitive UI' },
    { icon: <Speed />, title: 'Optimized', description: 'Built for speed and efficiency' },
    { icon: <Security />, title: 'Secure', description: 'Enterprise-grade security' },
    { icon: <Code />, title: 'Developer Friendly', description: 'Clean and maintainable code' },
    { icon: <Devices />, title: 'Responsive', description: 'Works on all devices' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.gradient,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={2}>
              <Chip
                label="MUI v7"
                color="primary"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}
              />
              <Chip
                label="React 18"
                color="secondary"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}
              />
              <Chip
                label="JavaScript"
                color="info"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}
              />
            </Stack>
            
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              Modern Web
              <br />
              <span style={{ color: '#90caf9' }}>Development</span>
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              Build stunning, responsive web applications with the latest technologies.
              Experience the power of Material-UI v7 with robust dark mode support.
            </Typography>
            
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {features.map((feature, index) => (
                <Card
                  key={index}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 8px)' },
                    minHeight: 200,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        color: '#90caf9',
                        mb: 2,
                        '& .MuiSvgIcon-root': {
                          fontSize: '2.5rem',
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
