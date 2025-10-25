import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography, Button, Card, CardContent, useTheme, Stack, Chip } from '@mui/material';
import {
  Code,
  Psychology,
  RocketLaunch,
  AutoAwesome,
  Gamepad,
  EmojiEvents,
  Speed,
  Memory,
} from '@mui/icons-material';

const GameSelector = ({ onGameSelect }) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const [hoveredGame, setHoveredGame] = useState(null);

  const games = [
    {
      id: 'code-collection',
      title: 'Code Collection Game',
      description: 'Collect programming concepts while avoiding bugs in this fast-paced arcade game!',
      icon: <Code />,
      color: '#61dafb',
      features: ['Real-time gameplay', 'Power-ups', 'Level progression', 'Bug avoidance'],
      difficulty: 'Easy',
    },
    {
      id: 'logic-puzzle',
      title: 'Logic Puzzle Portal',
      description: 'Solve mind-bending logic puzzles with quantum mechanics and crazy power-ups!',
      icon: <Psychology />,
      color: '#9c27b0',
      features: ['Logic gates', 'Quantum states', 'Memory sequences', 'Power-ups'],
      difficulty: 'Hard',
    },
    {
      id: 'heart-puzzle',
      title: 'Heart Puzzle Game',
      description: 'Solve mathematical puzzles hidden in beautiful heart shapes using real API data!',
      icon: <AutoAwesome />,
      color: '#ff1744',
      features: ['Real API puzzles', 'Heart shapes', 'Mathematical challenges', 'Power-ups'],
      difficulty: 'Medium',
    },
    {
      id: 'ultimate-mashup',
      title: 'Ultimate Game Mashup',
      description: 'Experience all games combined into one crazy adventure with dynamic mode switching!',
      icon: <RocketLaunch />,
      color: '#ff6b35',
      features: ['All games combined', 'Dynamic switching', 'Real API integration', 'Ultimate challenge'],
      difficulty: 'Expert',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate game cards on load
      gsap.fromTo('.game-card', 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
        }
      );

      // Floating background elements
      gsap.to('.floating-bg', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
        color: 'white',
        p: 4,
        overflow: 'hidden',
      }}
    >
      {/* Floating Background Elements */}
      <Box
        className="floating-bg"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          fontSize: '8rem',
          opacity: 0.1,
          color: theme.palette.primary.main,
        }}
      >
        <Gamepad />
      </Box>
      <Box
        className="floating-bg"
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          fontSize: '6rem',
          opacity: 0.1,
          color: theme.palette.secondary.main,
        }}
      >
        <EmojiEvents />
      </Box>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          🎮 Game Portal
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          Choose your adventure in the world of crazy game logic!
        </Typography>
      </Box>

      {/* Games Grid */}
      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        {games.map((game, index) => (
          <Card
            key={game.id}
            className="game-card"
            sx={{
              maxWidth: 400,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-10px) scale(1.02)',
                boxShadow: `0 20px 40px ${game.color}30`,
                border: `2px solid ${game.color}`,
              },
            }}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    color: game.color,
                    fontSize: '4rem',
                    mb: 2,
                    filter: hoveredGame === game.id ? 'drop-shadow(0 0 20px currentColor)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {game.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {game.title}
                </Typography>
                <Chip
                  label={game.difficulty}
                  size="small"
                  sx={{
                    backgroundColor: game.difficulty === 'Easy' ? '#4caf50' : '#ff9800',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Box>

              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                {game.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                  Features:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {game.features.map((feature, featureIndex) => (
                    <Chip
                      key={featureIndex}
                      label={feature}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: game.color,
                        color: game.color,
                        fontSize: '0.8rem',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => onGameSelect(game.id)}
                sx={{
                  background: `linear-gradient(45deg, ${game.color}, ${game.color}dd)`,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${game.color}dd, ${game.color})`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Play Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Back Button */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => onGameSelect('menu')}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.5)',
            color: 'white',
            px: 4,
            py: 2,
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Back to Portfolio
        </Button>
      </Box>
    </Box>
  );
};

export default GameSelector;
