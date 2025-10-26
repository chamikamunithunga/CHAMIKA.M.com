import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Twitter,
  Send,
} from '@mui/icons-material';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContact = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const contactCardsRef = useRef([]);

  const contactInfo = [
    {
      icon: <Email />,
      title: "Email",
      content: "munithungac@gmail.com",
      color: theme.palette.primary.main,
    },
    {
      icon: <Phone />,
      title: "Phone",
      content: "+94 74 1463230",
      color: theme.palette.secondary.main,
    },
    {
      icon: <LocationOn />,
      title: "Location",
      content: "Colombo, Sri Lanka",
      color: theme.palette.success.main,
    },
  ];

  const socialLinks = [
    { icon: <GitHub />, label: "GitHub", color: "#333", href: "https://github.com/chamikamunithunga" },
    { icon: <LinkedIn />, label: "LinkedIn", color: "#0077b5", href: "https://www.linkedin.com/in/chamika-munithunga-74801a2b1/" },
    
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact cards
      contactCardsRef.current.forEach((card, index) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            x: -100,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate form
      gsap.fromTo(formRef.current, 
        { 
          opacity: 0, 
          x: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="contact"
      ref={sectionRef}
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Get In Touch
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Ready to work together? Let's discuss your next project
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 6 }}>
          {/* Contact Information */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
              Contact Information
            </Typography>
            
            <Stack spacing={3} sx={{ mb: 4 }}>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  ref={el => contactCardsRef.current[index] = el}
                  sx={{
                    p: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(10px)',
                      boxShadow: `0 10px 30px ${info.color}20`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: `${info.color}20`,
                        color: info.color,
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {info.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>

            {/* Social Links */}
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Follow Me
            </Typography>
            <Stack direction="row" spacing={2}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  sx={{
                    backgroundColor: `${social.color}20`,
                    color: social.color,
                    '&:hover': {
                      backgroundColor: social.color,
                      color: 'white',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Contact Form */}
          <Box sx={{ flex: 1 }}>
            <Card
              ref={formRef}
              sx={{
                p: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Send Message
              </Typography>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  type="email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    background: theme.palette.background.gradient,
                    '&:hover': {
                      background: theme.palette.background.gradient,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AnimatedContact;
