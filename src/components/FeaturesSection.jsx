import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import {
  AutoAwesome,
  Palette,
  Speed,
  Security,
  Code,
  Devices,
  Accessibility,
  CloudDone,
} from '@mui/icons-material';

const FeaturesSection = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <AutoAwesome />,
      title: 'Modern Design System',
      description: 'Built with Material-UI v7, featuring the latest design principles and components.',
      color: theme.palette.primary.main,
    },
    {
      icon: <Palette />,
      title: 'Robust Dark Mode',
      description: 'Seamless dark/light theme switching with system preference detection.',
      color: theme.palette.secondary.main,
    },
    {
      icon: <Speed />,
      title: 'Optimized Performance',
      description: 'Lightning-fast load times with Vite and modern React patterns.',
      color: theme.palette.success.main,
    },
    {
      icon: <Security />,
      title: 'Type Safety',
      description: 'Full JavaScript support for better development experience.',
      color: theme.palette.error.main,
    },
    {
      icon: <Code />,
      title: 'Developer Experience',
      description: 'Clean, maintainable code with modern development tools.',
      color: theme.palette.info.main,
    },
    {
      icon: <Devices />,
      title: 'Responsive Design',
      description: 'Perfect experience across all devices and screen sizes.',
      color: theme.palette.warning.main,
    },
    {
      icon: <Accessibility />,
      title: 'Accessibility First',
      description: 'Built with accessibility in mind for inclusive user experiences.',
      color: theme.palette.primary.light,
    },
    {
      icon: <CloudDone />,
      title: 'Production Ready',
      description: 'Optimized for production with best practices and performance.',
      color: theme.palette.secondary.light,
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="Features"
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why Choose Our Platform?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Experience the future of web development with our cutting-edge technology stack
            and modern design principles.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' },
                minHeight: 280,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: feature.color,
                },
              }}
            >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${feature.color}20`,
                        borderRadius: 2,
                        p: 2,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ color: feature.color }}>
                        {feature.icon}
                      </Box>
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
