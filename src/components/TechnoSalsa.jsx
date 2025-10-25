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

const TechnoSalsa = () => {
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

      // Passionate salsa movements
      const salsaSequence = gsap.timeline({ repeat: -1 });
      salsaSequence
        .to(robot, { 
          rotationZ: -20, 
          x: -15, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 20, 
          x: 15, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationZ: 0, 
          x: 0, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: -25, 
          scale: 1.08, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          y: 0, 
          scale: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationY: 180, 
          duration: 0.8, 
          ease: "power2.inOut" 
        })
        .to(robot, { 
          rotationY: 360, 
          duration: 0.8, 
          ease: "power2.inOut" 
        });

      // Hip movements for salsa
      const hipSequence = gsap.timeline({ repeat: -1, delay: 1 });
      hipSequence
        .to(robot, { 
          rotationX: -10, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationX: 10, 
          duration: 0.3, 
          ease: "power2.out" 
        })
        .to(robot, { 
          rotationX: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });

      // Passionate arm movements
      const armSequence = gsap.timeline({ repeat: -1 });
      armSequence
        .to('.robot-arm-left', { 
          rotationZ: -60, 
          rotationY: -30, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to('.robot-arm-left', { 
          rotationZ: 0, 
          rotationY: 0, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 60, 
          rotationY: 30, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to('.robot-arm-right', { 
          rotationZ: 0, 
          rotationY: 0, 
          duration: 0.5, 
          ease: "power2.out" 
        });

      robot.salsaSequence = salsaSequence;
      robot.hipSequence = hipSequence;
      robot.armSequence = armSequence;

    }, robotRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    const robot = robotRef.current;
    
    if (!isPlaying) {
      robot.salsaSequence.play();
      robot.hipSequence.play();
      robot.armSequence.play();
    } else {
      robot.salsaSequence.pause();
      robot.hipSequence.pause();
      robot.armSequence.pause();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    const robot = robotRef.current;
    
    robot.salsaSequence.pause();
    robot.hipSequence.pause();
    robot.armSequence.pause();
    
    gsap.set(robot, { 
      rotationX: 0, 
      rotationY: 0, 
      rotationZ: 0, 
      scale: 1, 
      x: 0, 
      y: 0 
    });
    gsap.set('.robot-arm-left, .robot-arm-right', { rotationZ: 0, rotationY: 0 });
  };

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    const robot = robotRef.current;
    
    robot.salsaSequence.timeScale(newValue);
    robot.hipSequence.timeScale(newValue);
    robot.armSequence.timeScale(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff3743 0%, #ff6b6b 50%, #ff3743 100%)',
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
            radial-gradient(circle at 20% 80%, rgba(255, 55, 67, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 55, 67, 0.2) 0%, transparent 50%)
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
            💃 Techno Salsa - Latin Passion 🤖
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
                        radial-gradient(circle at 30% 30%, rgba(255, 55, 67, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)
                      `,
                    }
                  }}
                >
                  {/* Salsa Robot Figure */}
                  <Box
                    ref={robotRef}
                    sx={{
                      width: '190px',
                      height: '320px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Robot Head */}
                    <Box
                      sx={{
                        width: '75px',
                        height: '75px',
                        backgroundColor: '#ff3743',
                        borderRadius: '50%',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(255, 55, 67, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '18px',
                          left: '18px',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                          boxShadow: '22px 0 0 #fff',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '28px',
                          height: '4px',
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                        }
                      }}
                    />

                    {/* Robot Body */}
                    <Box
                      sx={{
                        width: '100px',
                        height: '130px',
                        backgroundColor: '#ff3743',
                        borderRadius: '18px',
                        position: 'relative',
                        mb: 2,
                        boxShadow: '0 0 20px rgba(255, 55, 67, 0.5)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '18px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '55px',
                          height: '38px',
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
                        top: '85px',
                        left: '-30px',
                        width: '18px',
                        height: '85px',
                        backgroundColor: '#ff3743',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(255, 55, 67, 0.5)',
                      }}
                    />
                    <Box
                      className="robot-arm-right"
                      sx={{
                        position: 'absolute',
                        top: '85px',
                        right: '-30px',
                        width: '18px',
                        height: '85px',
                        backgroundColor: '#ff3743',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(255, 55, 67, 0.5)',
                      }}
                    />

                    {/* Robot Legs */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-70px',
                        left: '20px',
                        width: '22px',
                        height: '70px',
                        backgroundColor: '#ff3743',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(255, 55, 67, 0.5)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-70px',
                        right: '20px',
                        width: '22px',
                        height: '70px',
                        backgroundColor: '#ff3743',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 15px rgba(255, 55, 67, 0.5)',
                      }}
                    />

                    {/* Salsa Skirt */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '110px',
                        height: '25px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        opacity: 0.9,
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                      }}
                    />
                  </Box>

                  {/* Passionate Dance Floor */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50px',
                      background: 'linear-gradient(90deg, #ff3743, #ff6b6b, #ff3743)',
                      opacity: 0.3,
                      animation: 'salsaFloor 1.5s ease-in-out infinite alternate',
                      '@keyframes salsaFloor': {
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
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#ff3743' }}>
                  Control Panel
                </Typography>

                {/* Play/Pause/Stop Controls */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                  <IconButton
                    onClick={handlePlay}
                    sx={{
                      backgroundColor: isPlaying ? '#ff3743' : '#4CAF50',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        backgroundColor: isPlaying ? '#ff6b6b' : '#45a049',
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
                      color: '#ff3743',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#ff3743',
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
                            color: '#ff3743',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#ff3743',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNote sx={{ mr: 1 }} />
                        <Typography variant="body1">Latin Music</Typography>
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
                    <Typography variant="body2">Rating: 4.7/5.0</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>Dance Style: Salsa & Bachata</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Difficulty: Intermediate</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Specialty: Partner Dancing</Typography>
                  <Typography variant="body2">Moves Library: 400+ Latin Moves</Typography>
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
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#ff3743' }}>
                Techno Salsa Features
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>💃 Partner Dancing</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialized in partner dancing with synchronized movements and lead/follow techniques.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🔥 Passionate Moves</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Executes passionate and energetic Latin dance moves with authentic flair and style.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🎵 Rhythm Mastery</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perfect rhythm synchronization with Latin music beats and complex timing patterns.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>🌶️ Latin Flavor</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Authentic Latin dance expressions with cultural accuracy and traditional movements.
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

export default TechnoSalsa;
