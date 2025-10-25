import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Button,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import {
  SmartToy,
  DirectionsRun,
  MusicNote,
  EmojiEvents,
  PlayArrow,
  Star,
} from '@mui/icons-material';

gsap.registerPlugin(ScrollTrigger);

const DancingRobots = ({ onGameSelect }) => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const robotCardsRef = useRef([]);

  const robots = [
    {
      id: "neo-dancer",
      title: "Neo DirectionsRunr",
      description: "Advanced AI-powered robot with fluid hip-hop and breakdancing moves. Features real-time beat detection and synchronized choreography.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YjAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZW8gRGFuY2VyPC90ZXh0Pjwvc3ZnPg==",
      technologies: ["AI", "3D Animation", "Beat Detection", "Hip-Hop"],
      type: "Hip-Hop Specialist",
      difficulty: "Advanced",
      rating: 4.9,
      color: "#ff6b00",
      danceStyle: "Hip-Hop & Breakdancing",
      specialFeatures: ["Real-time Beat Sync", "Advanced Acrobatics", "Multi-limb Coordination"]
    },
    {
      id: "cyber-ballet",
      title: "Cyber Ballet",
      description: "Elegant robotic ballerina with precise classical dance movements. Combines traditional ballet with futuristic technology for graceful performances.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTQwMWY3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DeWJlciBCYWxsZXQ8L3RleHQ+PC9zdmc+",
      technologies: ["Classical AI", "Precision Motors", "Grace Algorithms", "Ballet"],
      type: "Classical Specialist",
      difficulty: "Expert",
      rating: 4.8,
      color: "#e401f7",
      danceStyle: "Classical Ballet",
      specialFeatures: ["Perfect Posture", "Elegant Transitions", "Emotional Expression"]
    },
    {
      id: "techno-salsa",
      title: "Techno Salsa",
      description: "Passionate Latin dance robot with fiery salsa and bachata moves. Features partner dancing capabilities and rhythm synchronization.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmYzNzQzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZWNobm8gU2Fsc2E8L3RleHQ+PC9zdmc+",
      technologies: ["Latin AI", "Partner Sync", "Rhythm Engine", "Salsa"],
      type: "Latin Specialist",
      difficulty: "Intermediate",
      rating: 4.7,
      color: "#ff3743",
      danceStyle: "Salsa & Bachata",
      specialFeatures: ["Partner Dancing", "Passionate Moves", "Rhythm Mastery"]
    },
    {
      id: "quantum-poppin",
      title: "Quantum Poppin'",
      description: "Revolutionary robot specializing in popping, locking, and robotic dance styles. Features quantum-level precision in isolation movements.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDBmZjAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RdWFudHVtIFBvcHBpbic8L3RleHQ+PC9zdmc+",
      technologies: ["Quantum AI", "Isolation Tech", "Robotic Movement", "Popping"],
      type: "Robotic Specialist",
      difficulty: "Master",
      rating: 5.0,
      color: "#00ff00",
      danceStyle: "Popping & Locking",
      specialFeatures: ["Quantum Precision", "Perfect Isolation", "Robotic Perfection"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate robot cards with dancing effect
      robotCardsRef.current.forEach((card, index) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 100,
            rotationY: -15,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add continuous dancing animation
        gsap.to(card, {
          y: -10,
          rotationY: 5,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRobotClick = (robotId) => {
    // Navigate to individual robot page
    if (onGameSelect) {
      onGameSelect(robotId);
    }
  };

  return (
    <Box
      id="dancing-robots"
      ref={sectionRef}
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255, 107, 0, 0.1) 0%, rgba(228, 1, 247, 0.1) 25%, rgba(255, 55, 67, 0.1) 50%, rgba(0, 255, 0, 0.1) 100%)',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #ff6b00, #e401f7, #ff3743, #00ff00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
            }}
          >
            🕺 Dancing Robots 🤖
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Experience the future of dance with our advanced AI-powered robotic performers. 
            Each robot specializes in different dance styles with incredible precision and artistry.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            <Chip icon={<SmartToy />} label="AI Powered" color="primary" variant="outlined" />
            <Chip icon={<DirectionsRun />} label="Multiple Styles" color="secondary" variant="outlined" />
            <Chip icon={<MusicNote />} label="Beat Sync" color="success" variant="outlined" />
            <Chip icon={<EmojiEvents />} label="Competition Ready" color="warning" variant="outlined" />
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {robots.map((robot, index) => (
            <Card
              key={robot.id}
              ref={el => robotCardsRef.current[index] = el}
              onClick={() => handleRobotClick(robot.id)}
              sx={{
                flex: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 21.33px)' },
                maxWidth: { xs: '100%', sm: '400px' },
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `3px solid ${robot.color}`,
                borderRadius: '20px',
                '&:hover': {
                  transform: 'translateY(-15px) scale(1.05)',
                  boxShadow: `0 25px 50px ${robot.color}40`,
                  border: `3px solid ${robot.color}`,
                  '& .robot-image': {
                    transform: 'scale(1.1) rotate(5deg)',
                  },
                  '& .play-button': {
                    opacity: 1,
                    transform: 'scale(1.2)',
                  }
                },
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  className="robot-image"
                  component="img"
                  height="250"
                  image={robot.image}
                  alt={robot.title}
                  sx={{
                    transition: 'all 0.4s ease',
                    filter: 'brightness(1.1) contrast(1.1)',
                  }}
                />
                <Box
                  className="play-button"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '50%',
                    p: 2,
                  }}
                >
                  <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: robot.color,
                    color: 'white',
                    borderRadius: '20px',
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Star sx={{ fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {robot.rating}
                  </Typography>
                </Box>
              </Box>
              
              <CardContent sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Chip
                    icon={<DirectionsRun />}
                    label={robot.type}
                    size="small"
                    sx={{
                      backgroundColor: `${robot.color}20`,
                      color: robot.color,
                      fontWeight: 600,
                      border: `1px solid ${robot.color}`,
                    }}
                  />
                  <Chip
                    label={robot.difficulty}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: robot.color }}>
                  {robot.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {robot.description}
                </Typography>

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: robot.color }}>
                  DirectionsRun Style: {robot.danceStyle}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                  {robot.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: robot.color,
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Stack>

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Special Features:
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {robot.specialFeatures.map((feature, featureIndex) => (
                    <Typography key={featureIndex} variant="body2" sx={{ mb: 0.5, color: 'text.secondary' }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: robot.color,
                    color: 'white',
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: robot.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${robot.color}40`,
                    },
                  }}
                >
                  Watch {robot.title} DirectionsRun
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: theme.palette.primary.main }}>
            Ready to Experience the Future of DirectionsRun?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Click on any robot above to see their incredible dancing performances in action. 
            Each robot has been programmed with thousands of dance moves and can adapt to any music style.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DancingRobots;
