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

const QuantumPoppin = () => {
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
        transformOrigin: "center center",
      });

      // Quantum precision isolation movements
      const isolationSequence = gsap.timeline({ repeat: -1 });
      isolationSequence
        .to('.robot-head', { 
          rotationZ: -15, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-head', { 
          rotationZ: 15, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-head', { 
          rotationZ: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-body', { 
          scaleX: 1.1, 
          duration: 0.15, 
          ease: "power2.out" 
        })
        .to('.robot-body', { 
          scaleX: 0.9, 
          duration: 0.15, 
          ease: "power2.out" 
        })
        .to('.robot-body', { 
          scaleX: 1, 
          duration: 0.15, 
          ease: "power2.out" 
        })
        .to('.robot-leg-left', { 
          rotationZ: -20, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to('.robot-leg-left', { 
          rotationZ: 0, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to('.robot-leg-right', { 
          rotationZ: 20, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to('.robot-leg-right', { 
          rotationZ: 0, 
          duration: 0.1, 
          ease: "power2.out" 
        });

      // Robotic popping sequence
      const poppingSequence = gsap.timeline({ repeat: -1, delay: 2 });
      poppingSequence
        .to(robot, { 
          scale: 1.2, 
          duration: 0.05, 
          ease: "power2.out" 
        })
        .to(robot, { 
          scale: 0.8, 
          duration: 0.05, 
          ease: "power2.out" 
        })
        .to(robot, { 
          scale: 1, 
          duration: 0.05, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 90, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 180, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 270, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 360, 
          duration: 0.1, 
          ease: "power2.out" 
        });

      // Locking movements
      const lockingSequence = gsap.timeline({ repeat: -1, delay: 4 });
      lockingSequence
        .to('.robot-arm-left', { 
          rotationZ: -90, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-arm-left', { 
          rotationZ: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 90, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: -20, 
          duration: 0.1, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: 0, 
          duration: 0.1, 
          ease: "power2.out" 
        });

      robot.isolationSequence = isolationSequence;
      robot.poppingSequence = poppingSequence;
      robot.lockingSequence = lockingSequence;

    }, robotRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    const robot = robotRef.current;
    
    if (!isPlaying) {
      robot.isolationSequence.play();
      robot.poppingSequence.play();
      robot.lockingSequence.play();
    } else {
      robot.isolationSequence.pause();
      robot.poppingSequence.pause();
      robot.lockingSequence.pause();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    const robot = robotRef.current;
    
    robot.isolationSequence.pause();
    robot.poppingSequence.pause();
    robot.lockingSequence.pause();
    
    gsap.set(robot, { 
      rotationX: 0, 
      rotationY: 0, 
      rotationZ: 0, 
      scale: 1, 
      x: 0, 
      y: 0 
    });
    gsap.set('.robot-head, .robot-body, .robot-leg-left, .robot-leg-right, .robot-arm-left, .robot-arm-right', { 
      rotationZ: 0, 
      scaleX: 1 
    });
  };

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    const robot = robotRef.current;
    
    robot.isolationSequence.timeScale(newValue);
    robot.poppingSequence.timeScale(newValue);
    robot.lockingSequence.timeScale(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00ff00 0%, #32cd32 50%, #00ff00 100%)',
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
            radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(50, 205, 50, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.2) 0%, transparent 50%)
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
            🤖 Quantum Poppin' - Robotic Perfection 🤖
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
                        radial-gradient(circle at 30% 30%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(50, 205, 50, 0.1) 0%, transparent 50%)
                      `,
                    }
                  }}
                >
                  {/* Quantum Robot Figure */}
                  <Box
                    ref={robotRef}
                    sx={{
                      width: '200px',
                      height: '300px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Robot Head */}
                    <Box
                      className="robot-head"
                      sx={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#00ff00',
                        borderRadius: '50%',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '20px',
                          left: '20px',
                          width: '15px',
                          height: '15px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                          boxShadow: '25px 0 0 #fff',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '30px',
                          height: '5px',
                          backgroundColor: '#fff',
                          borderRadius: '5px',
                        }
                      }}
                    />

                    {/* Robot Body */}
                    <Box
                      className="robot-body"
                      sx={{
                        width: '100px',
                        height: '120px',
                        backgroundColor: '#00ff00',
                        borderRadius: '20px',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '60px',
                          height: '40px',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                        }
                      }}
                    />

                    {/* Robot Arms */}
                    <Box
                      className="robot-arm-left"
                      sx={{
                        position: 'absolute',
                        top: '100px',
                        left: '-30px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#00ff00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
                      }}
                    />
                    <Box
                      className="robot-arm-right"
                      sx={{
                        position: 'absolute',
                        top: '100px',
                        right: '-30px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#00ff00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
                      }}
                    />

                    {/* Robot Legs */}
                    <Box
                      className="robot-leg-left"
                      sx={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '20px',
                        width: '25px',
                        height: '60px',
                        backgroundColor: '#00ff00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
                      }}
                    />
                    <Box
                      className="robot-leg-right"
                      sx={{
                        position: 'absolute',
                        bottom: '-60px',
                        right: '20px',
                        width: '25px',
                        height: '60px',
                        backgroundColor: '#00ff00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
                      }}
                    />
                  </Box>

                  {/* Quantum Dance Floor */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50px',
                      background: 'linear-gradient(90deg, #00ff00, #32cd32, #00ff00)',
                      opacity: 0.3,
                      animation: 'quantumFloor 1s ease-in-out infinite alternate',
                      '@keyframes quantumFloor': {
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
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#00ff00' }}>
                  Control Panel
                </Typography>

                {/* Play/Pause/Stop Controls */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                  <IconButton
                    onClick={handlePlay}
                    sx={{
                      backgroundColor: isPlaying ? '#00ff00' : '#4CAF50',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        backgroundColor: isPlaying ? '#32cd32' : '#45a049',
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
                      color: '#00ff00',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#00ff00',
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
                            color: '#00ff00',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#00ff00',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNote sx={{ mr: 1 }} />
                        <Typography variant="body1">Electronic Music</Typography>
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
                    <Typography variant="body2">Rating: 5.0/5.0</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>Dance Style: Popping & Locking</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Difficulty: Master</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Specialty: Quantum Precision</Typography>
                  <Typography variant="body2">Moves Library: 600+ Robotic Moves</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ mt: 6 }}>
          <Card sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#00ff00' }}>
                Quantum Poppin' Features
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>⚛️ Quantum Precision</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perfect isolation movements with quantum-level precision in every joint and muscle group.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🤖 Perfect Isolation</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Executes perfect isolation movements where individual body parts move independently.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🔧 Robotic Perfection</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Achieves robotic perfection in popping, locking, and mechanical dance movements.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>⚡ Lightning Speed</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Executes movements at lightning speed with perfect timing and synchronization.
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

export default QuantumPoppin;
