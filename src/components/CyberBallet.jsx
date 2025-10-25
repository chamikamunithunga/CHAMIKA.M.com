import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Card,
  CardContent,
  useTheme,
  Slider,
  Switch,
  FormControlLabel,
  Stack,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  VolumeUp,
  Home,
  Speed,
  MusicNote,
  Star,
} from '@mui/icons-material';

const CyberBallet = () => {
  const theme = useTheme();
  const robotRef = useRef(null);
  const danceAreaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [musicEnabled, setMusicEnabled] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const robot = robotRef.current;
      
      gsap.set(robot, {
        perspective: 1000,
        transformOrigin: "center bottom",
      });

      // Elegant ballet movements
      const balletSequence = gsap.timeline({ repeat: -1 });
      balletSequence
        .to(robot, { 
          rotationZ: -10, 
          duration: 1, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          rotationZ: 10, 
          duration: 1, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          rotationZ: 0, 
          duration: 1, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          y: -30, 
          scale: 1.05, 
          duration: 0.8, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 180, 
          duration: 2, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          rotationY: 360, 
          duration: 2, 
          ease: "power2.inOut" 
        });

      // Graceful pirouette
      const pirouetteSequence = gsap.timeline({ repeat: -1, delay: 3 });
      pirouetteSequence
        .to(robot, { 
          rotationZ: 720, 
          scale: 1.1, 
          duration: 2, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 0, 
          scale: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        });

      // Elegant arm movements
      const armSequence = gsap.timeline({ repeat: -1 });
      armSequence
        .to('.robot-arm-left', { 
          rotationZ: -45, 
          duration: 1.5, 
          ease: "power2.inOut" 
        })
        .to('.robot-arm-left', { 
          rotationZ: 0, 
          duration: 1.5, 
          ease: "power2.inOut" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 45, 
          duration: 1.5, 
          ease: "power2.inOut" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 0, 
          duration: 1.5, 
          ease: "power2.inOut" 
        });

      robot.balletSequence = balletSequence;
      robot.pirouetteSequence = pirouetteSequence;
      robot.armSequence = armSequence;

    }, robotRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    const robot = robotRef.current;
    
    if (!isPlaying) {
      robot.balletSequence.play();
      robot.pirouetteSequence.play();
      robot.armSequence.play();
    } else {
      robot.balletSequence.pause();
      robot.pirouetteSequence.pause();
      robot.armSequence.pause();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    const robot = robotRef.current;
    
    robot.balletSequence.pause();
    robot.pirouetteSequence.pause();
    robot.armSequence.pause();
    
    gsap.set(robot, { 
      rotationX: 0, 
      rotationY: 0, 
      rotationZ: 0, 
      scale: 1, 
      x: 0, 
      y: 0 
    });
    gsap.set('.robot-arm-left, .robot-arm-right', { rotationZ: 0 });
  };

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    const robot = robotRef.current;
    
    robot.balletSequence.timeScale(newValue);
    robot.pirouetteSequence.timeScale(newValue);
    robot.armSequence.timeScale(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e401f7 0%, #c71585 50%, #e401f7 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(228, 1, 247, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(199, 21, 133, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(228, 1, 247, 0.2) 0%, transparent 50%)
          `,
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => window.history.back()}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              color: 'white', 
              mr: 2,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            <Home />
          </IconButton>
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 800,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            flex: 1
          }}>
            💃 Cyber Ballet - Classical Elegance 🤖
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Dance Area */}
          <Box sx={{ flex: 1, minWidth: '400px' }}>
            <Card sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <CardContent sx={{ p: 0 }}>
                <Box
                  ref={danceAreaRef}
                  sx={{
                    height: '500px',
                    background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(228, 1, 247, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(199, 21, 133, 0.1) 0%, transparent 50%)
                      `,
                    }
                  }}
                >
                  {/* Ballet Robot Figure */}
                  <Box
                    ref={robotRef}
                    sx={{
                      width: '180px',
                      height: '350px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Robot Head */}
                    <Box
                      sx={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#e401f7',
                        borderRadius: '50%',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(228, 1, 247, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '15px',
                          left: '15px',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                          boxShadow: '20px 0 0 #fff',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '25px',
                          height: '4px',
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                        }
                      }}
                    />

                    {/* Robot Body */}
                    <Box
                      sx={{
                        width: '90px',
                        height: '140px',
                        backgroundColor: '#e401f7',
                        borderRadius: '15px',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(228, 1, 247, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '50px',
                          height: '35px',
                          backgroundColor: '#fff',
                          borderRadius: '8px',
                        }
                      }}
                    />

                    {/* Robot Arms */}
                    <Box
                      className="robot-arm-left"
                      sx={{
                        position: 'absolute',
                        top: '90px',
                        left: '-25px',
                        width: '15px',
                        height: '90px',
                        backgroundColor: '#e401f7',
                        borderRadius: '8px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(228, 1, 247, 0.5)',
                      }}
                    />
                    <Box
                      className="robot-arm-right"
                      sx={{
                        position: 'absolute',
                        top: '90px',
                        right: '-25px',
                        width: '15px',
                        height: '90px',
                        backgroundColor: '#e401f7',
                        borderRadius: '8px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(228, 1, 247, 0.5)',
                      }}
                    />

                    {/* Robot Legs */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-80px',
                        left: '15px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#e401f7',
                        borderRadius: '8px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(228, 1, 247, 0.5)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-80px',
                        right: '15px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#e401f7',
                        borderRadius: '8px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(228, 1, 247, 0.5)',
                      }}
                    />

                    {/* Ballet Tutu */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '30px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        opacity: 0.8,
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </Box>

                  {/* Elegant Dance Floor */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50px',
                      background: 'linear-gradient(90deg, #e401f7, #c71585, #e401f7)',
                      opacity: 0.3,
                      animation: 'balletFloor 3s ease-in-out infinite alternate',
                      '@keyframes balletFloor': {
                        '0%': { opacity: 0.3 },
                        '100%': { opacity: 0.7 },
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Controls Panel */}
          <Box sx={{ minWidth: '300px' }}>
            <Card sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#e401f7' }}>
                  Control Panel
                </Typography>

                {/* Play/Pause/Stop Controls */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                  <IconButton
                    onClick={handlePlay}
                    sx={{
                      backgroundColor: isPlaying ? '#e401f7' : '#4CAF50',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        backgroundColor: isPlaying ? '#c71585' : '#45a049',
                      }
                    }}
                  >
                    {isPlaying ? <Pause sx={{ fontSize: 30 }} /> : <PlayArrow sx={{ fontSize: 30 }} />}
                  </IconButton>
                  <IconButton
                    onClick={handleStop}
                    sx={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        backgroundColor: '#da190b',
                      }
                    }}
                  >
                    <Stop sx={{ fontSize: 30 }} />
                  </IconButton>
                </Stack>

                {/* Speed Control */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Dance Speed: {speed}x
                  </Typography>
                  <Slider
                    value={speed}
                    onChange={handleSpeedChange}
                    min={0.5}
                    max={3}
                    step={0.1}
                    sx={{
                      color: '#e401f7',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#e401f7',
                      }
                    }}
                  />
                </Box>

                {/* Music Toggle */}
                <Box sx={{ mb: 4 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={musicEnabled}
                        onChange={(e) => setMusicEnabled(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#e401f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#e401f7',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNote sx={{ mr: 1 }} />
                        <Typography variant="body1">Classical Music</Typography>
                      </Box>
                    }
                  />
                </Box>

                {/* Robot Stats */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Robot Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Star sx={{ color: '#ffd700', mr: 1 }} />
                    <Typography variant="body2">Rating: 4.8/5.0</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>Dance Style: Classical Ballet</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Difficulty: Expert</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Specialty: Perfect Posture</Typography>
                  <Typography variant="body2">Moves Library: 300+ Classical Moves</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ mt: 6 }}>
          <Card sx={{ 
            backgroundColor: 'rgba(255, verbosity, 255, 0.95)', 
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#e401f7' }}>
                Cyber Ballet Features
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎭 Perfect Posture</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maintains flawless ballet posture with precise body alignment and graceful positioning.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>💫 Elegant Transitions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Smooth and graceful transitions between classical ballet positions and movements.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎵 Emotional Expression</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conveys emotion through movement, bringing classical ballet to life with AI-powered expression.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎪 Pirouette Master</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Executes perfect pirouettes and spins with incredible balance and precision.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default CyberBallet;
