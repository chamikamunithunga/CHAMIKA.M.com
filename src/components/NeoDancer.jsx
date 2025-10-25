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
  Settings,
  Home,
  Speed,
  MusicNote,
  Star,
} from '@mui/icons-material';

const NeoDancer = () => {
  const theme = useTheme();
  const robotRef = useRef(null);
  const danceAreaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [musicEnabled, setMusicEnabled] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the 3D robot figure
      const robot = robotRef.current;
      
      // Initial robot setup
      gsap.set(robot, {
        perspective: 1000,
        transformOrigin: "center center",
      });

      // Continuous idle animation
      const idleAnimation = gsap.timeline({ repeat: -1, yoyo: true });
      idleAnimation
        .to(robot, { 
          rotationY: 5, 
          duration: 2, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          rotationY: -5, 
          duration: 2, 
          ease: "power2.inOut" 
        }, "-=1");

      // Hip-hop dance sequence
      const hipHopDance = gsap.timeline({ repeat: -1 });
      hipHopDance
        .to(robot, { 
          rotationZ: -15, 
          scaleX: 1.1, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 15, 
          scaleX: 0.9, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 0, 
          scaleX: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: -20, 
          rotationX: -10, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: 0, 
          rotationX: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 360, 
          duration: 1, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          scale: 0.8, 
          duration: 0.1 
        })
        .to(robot, { 
          scale: 1.2, 
          duration: 0.1 
        })
        .to(robot, { 
          scale: 1, 
          duration: 0.1 
        });

      // Breakdancing moves
      const breakdanceSequence = gsap.timeline({ repeat: -1, delay: 2 });
      breakdanceSequence
        .to(robot, { 
          rotationZ: 180, 
          scale: 0.9, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 360, 
          scale: 1.1, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 0, 
          scale: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: -30, 
          rotationX: -20, 
          duration: 0.3 
        })
        .to(robot, { 
          y: 0, 
          rotationX: 0, 
          duration: 0.3 
        });

      // Store animations for control
      robot.hipHopDance = hipHopDance;
      robot.breakdanceSequence = breakdanceSequence;
      robot.idleAnimation = idleAnimation;

    }, robotRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    const robot = robotRef.current;
    
    if (!isPlaying) {
      robot.hipHopDance.play();
      robot.breakdanceSequence.play();
      robot.idleAnimation.pause();
    } else {
      robot.hipHopDance.pause();
      robot.breakdanceSequence.pause();
      robot.idleAnimation.play();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    const robot = robotRef.current;
    
    robot.hipHopDance.pause();
    robot.breakdanceSequence.pause();
    robot.idleAnimation.restart();
    
    gsap.set(robot, { 
      rotationX: 0, 
      rotationY: 0, 
      rotationZ: 0, 
      scale: 1, 
      x: 0, 
      y: 0 
    });
  };

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    const robot = robotRef.current;
    
    robot.hipHopDance.timeScale(newValue);
    robot.breakdanceSequence.timeScale(newValue);
    robot.idleAnimation.timeScale(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff6b00 0%, #ff8c00 50%, #ff6b00 100%)',
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
            radial-gradient(circle at 20% 80%, rgba(255, 107, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 107, 0, 0.2) 0%, transparent 50%)
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
            🕺 Neo Dancer - Hip-Hop Master 🤖
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
                        radial-gradient(circle at 30% 30%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(255, 140, 0, 0.1) 0%, transparent 50%)
                      `,
                    }
                  }}
                >
                  {/* Robot Figure */}
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
                      sx={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '50%',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(255, 107, 0, 0.5)',
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
                      sx={{
                        width: '100px',
                        height: '120px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '20px',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(255, 107, 0, 0.5)',
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
                      sx={{
                        position: 'absolute',
                        top: '100px',
                        left: '-30px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100px',
                        right: '-30px',
                        width: '20px',
                        height: '80px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                      }}
                    />

                    {/* Robot Legs */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '20px',
                        width: '25px',
                        height: '60px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-60px',
                        right: '20px',
                        width: '25px',
                        height: '60px',
                        backgroundColor: '#ff6b00',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                      }}
                    />
                  </Box>

                  {/* Dance Floor Effects */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50px',
                      background: 'linear-gradient(90deg, #ff6b00, #ff8c00, #ff6b00)',
                      opacity: 0.3,
                      animation: 'danceFloor 2s ease-in-out infinite alternate',
                      '@keyframes danceFloor': {
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
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#ff6b00' }}>
                  Control Panel
                </Typography>

                {/* Play/Pause/Stop Controls */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                  <IconButton
                    onClick={handlePlay}
                    sx={{
                      backgroundColor: isPlaying ? '#ff6b00' : '#4CAF50',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        backgroundColor: isPlaying ? '#ff8c00' : '#45a049',
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
                      color: '#ff6b00',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#ff6b00',
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
                            color: '#ff6b00',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#ff6b00',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNote sx={{ mr: 1 }} />
                        <Typography variant="body1">Background Music</Typography>
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
                    <Typography variant="body2">Rating: 4.9/5.0</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>Dance Style: Hip-Hop & Breakdancing</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Difficulty: Advanced</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Specialty: Real-time Beat Sync</Typography>
                  <Typography variant="body2">Moves Library: 500+ Hip-Hop Moves</Typography>
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
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#ff6b00' }}>
                Neo Dancer Features
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎵 Beat Detection</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Advanced AI analyzes music in real-time to synchronize dance moves perfectly with the beat.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🤸 Acrobatics</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Performs complex breakdancing moves including spins, flips, and ground techniques.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎯 Precision</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantum-level precision in isolation movements and multi-limb coordination.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>⚡ Adaptability</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learns and adapts to different music genres and dance styles automatically.
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

export default NeoDancer;
