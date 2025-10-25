import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AnimatedHome = () => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      // Button animation
      gsap.fromTo(buttonRef.current,
        { 
          opacity: 0, 
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1,
          ease: "back.out(1.7)",
        }
      );

      // Floating particles animation
      gsap.set(".floating-particle", {
        x: "random(0, 100vw)",
        y: "random(0, 100vh)",
      });

      gsap.to(".floating-particle", {
        x: "+=random(-200, 200)",
        y: "+=random(-200, 200)",
        rotation: "random(0, 360)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="home"
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url('/imgs/bg1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundClip: 'border-box',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%)',
          zIndex: 1,
        },
      }}
    >
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          className="floating-particle"
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'rgba(100, 181, 246, 0.4)',
            boxShadow: '0 0 10px rgba(100, 181, 246, 0.6)',
            zIndex: 2,
          }}
        />
      ))}


      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4 }}>
        <Box sx={{ textAlign: 'center', color: 'white', px: { xs: 2, md: 0 } }}>
          <Typography
            ref={titleRef}
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 900,
              mb: 3,
              background: 'linear-gradient(45deg, #ffffff, #64b5f6, #e3f2fd, #ffffff)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 3s ease-in-out infinite',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(100, 181, 246, 0.4)',
              lineHeight: { xs: 1.2, md: 1.1 },
            }}
          >
            Hi, I'm a
            <br />
            <span style={{ color: '#90caf9' }}>Full Stack</span>
            <br />
            Developer
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="h4"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 300,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' },
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.3)',
              px: { xs: 2, md: 0 },
              lineHeight: { xs: 1.4, md: 1.3 },
            }}
          >
            Crafting Digital Experiences with Passion & Innovation
          </Typography>

          <Box ref={buttonRef}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 600,
                borderRadius: 3,
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(100, 181, 246, 0.4)',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(100, 181, 246, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(100, 181, 246, 0.4)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 40px rgba(100, 181, 246, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(100, 181, 246, 0.6)',
                },
              }}
            >
              🚀 View My Work
            </Button>
          </Box>

          {/* Tech Stats */}
          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              opacity: 0.9,
              px: { xs: 2, md: 0 },
            }}
          >
            {[
              { label: 'Technologies', value: '50+' },
              { label: 'Projects', value: '100+'  },
              { label: 'Experience', value: '2+' },
              { label: 'Clients', value: '20+' },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(100, 180, 246, 0.34)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '15px',
                  padding: { xs: '10px', md: '20px' },
                  border: '1px solid rgba(100, 181, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(100, 181, 246, 0.2)',
                  minWidth: { xs: '100px', md: '100px' },
                  flex: { xs: '1 1 calc(40% - 8px)', md: '1 1 calc(25% - 12px)' },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: 'rgba(100, 181, 246, 0.2)',
                    boxShadow: '0 0 30px rgba(100, 181, 246, 0.4)',
                    border: '1px solid rgba(100, 181, 246, 0.5)',
                  },
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </Box>
  );
};

export default AnimatedHome;
