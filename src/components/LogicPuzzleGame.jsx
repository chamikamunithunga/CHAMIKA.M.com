import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography, Button, Card, CardContent, useTheme, Chip, Stack, Grid } from '@mui/material';
import {
  Psychology,
  Lightbulb,
  AutoAwesome,
  Code,
  Memory,
  Speed,
  Security,
  BugReport,
} from '@mui/icons-material';

const LogicPuzzleGame = () => {
  const theme = useTheme();
  const gameRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedItems, setSelectedItems] = useState([]);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState([]);

  // Crazy puzzle logic - each puzzle has unique rules
  const puzzles = [
    {
      id: 1,
      title: "Binary Logic Gate",
      description: "Create a working AND gate",
      items: [
        { id: 1, type: 'input', value: true, icon: <Code />, color: '#4caf50' },
        { id: 2, type: 'input', value: false, icon: <Code />, color: '#f44336' },
        { id: 3, type: 'gate', gateType: 'AND', icon: <Psychology />, color: '#2196f3' },
        { id: 4, type: 'output', expected: false, icon: <Lightbulb />, color: '#ff9800' },
      ],
      solution: [1, 3, 2, 3, 4],
      reward: 100,
    },
    {
      id: 2,
      title: "Memory Sequence",
      description: "Remember and recreate the sequence",
      items: [
        { id: 1, type: 'memory', sequence: [1, 2, 3, 4], icon: <Memory />, color: '#9c27b0' },
        { id: 2, type: 'input', value: 1, icon: <Code />, color: '#4caf50' },
        { id: 3, type: 'input', value: 2, icon: <Code />, color: '#4caf50' },
        { id: 4, type: 'input', value: 3, icon: <Code />, color: '#4caf50' },
        { id: 5, type: 'input', value: 4, icon: <Code />, color: '#4caf50' },
      ],
      solution: [2, 3, 4, 5],
      reward: 150,
    },
    {
      id: 3,
      title: "Quantum Superposition",
      description: "Handle quantum states",
      items: [
        { id: 1, type: 'quantum', state: 'superposition', icon: <AutoAwesome />, color: '#e91e63' },
        { id: 2, type: 'observer', icon: <Psychology />, color: '#2196f3' },
        { id: 3, type: 'output', expected: 'collapsed', icon: <Lightbulb />, color: '#ff9800' },
      ],
      solution: [1, 2, 3],
      reward: 200,
    },
  ];

  // Crazy power-ups with unique effects
  const powerUpTypes = [
    { id: 1, name: 'Time Freeze', icon: <Speed />, effect: 'freeze', color: '#00bcd4' },
    { id: 2, name: 'Logic Boost', icon: <Psychology />, effect: 'boost', color: '#4caf50' },
    { id: 3, name: 'Memory Flash', icon: <Memory />, effect: 'flash', color: '#9c27b0' },
    { id: 4, name: 'Quantum Leap', icon: <AutoAwesome />, effect: 'leap', color: '#e91e63' },
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentPuzzle(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedItems([]);
    setPuzzleComplete(false);
    setStreak(0);
    setPowerUps([]);
    startPuzzleTimer();
  };

  const startPuzzleTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - crazy penalty system
          setScore(prev => Math.max(0, prev - 50));
          setStreak(0);
          nextPuzzle();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      setTimeLeft(30);
      setSelectedItems([]);
      setPuzzleComplete(false);
      spawnRandomPowerUp();
    } else {
      setGameState('gameOver');
    }
  };

  // Crazy power-up spawning system
  const spawnRandomPowerUp = () => {
    if (Math.random() < 0.3) {
      const powerUp = {
        ...powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        active: false,
      };
      setPowerUps(prev => [...prev, powerUp]);
    }
  };

  const selectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };

  const submitSolution = () => {
    const puzzle = puzzles[currentPuzzle];
    const isCorrect = JSON.stringify(selectedItems) === JSON.stringify(puzzle.solution);
    
    if (isCorrect) {
      // Crazy success effects
      setPuzzleComplete(true);
      setScore(prev => {
        const baseReward = puzzle.reward;
        const streakBonus = streak * 10;
        const timeBonus = Math.floor(timeLeft * 2);
        return prev + baseReward + streakBonus + timeBonus;
      });
      setStreak(prev => prev + 1);
      
      // Crazy particle effect
      createSuccessEffect();
      
      // Auto advance after delay
      setTimeout(() => {
        nextPuzzle();
      }, 2000);
    } else {
      // Crazy failure effects
      setScore(prev => Math.max(0, prev - 25));
      setStreak(0);
      setSelectedItems([]);
      createFailureEffect();
    }
  };

  const usePowerUp = (powerUpId) => {
    const powerUp = powerUps.find(p => p.id === powerUpId);
    if (!powerUp) return;

    setPowerUps(prev => prev.filter(p => p.id !== powerUpId));

    switch (powerUp.effect) {
      case 'freeze':
        setTimeLeft(prev => prev + 10);
        break;
      case 'boost':
        setScore(prev => prev + 50);
        break;
      case 'flash':
        // Show solution briefly
        setSelectedItems(puzzles[currentPuzzle].solution);
        setTimeout(() => setSelectedItems([]), 2000);
        break;
      case 'leap':
        // Skip to next puzzle
        nextPuzzle();
        break;
    }
  };

  const createSuccessEffect = () => {
    // Crazy success animation
    gsap.to(gameRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Particle explosion
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.backgroundColor = '#4caf50';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      gameRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  };

  const createFailureEffect = () => {
    // Crazy failure animation
    gsap.to(gameRef.current, {
      rotation: "random(-5, 5)",
      duration: 0.1,
      repeat: 10,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  if (gameState === 'menu') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 600, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              🧠 Logic Puzzle Portal
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Solve mind-bending logic puzzles with crazy mechanics!
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Solve logic gates and sequences</Typography>
              <Typography variant="body1">• Use power-ups for crazy effects</Typography>
              <Typography variant="body1">• Build streaks for bonus points</Typography>
              <Typography variant="body1">• Quantum mechanics included!</Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ px: 4, py: 2 }}
            >
              Enter the Portal
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              🎉 Portal Master!
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Final Score: {score}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Puzzles Solved: {puzzles.length}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ px: 4, py: 2 }}
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <Box
      ref={gameRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
        color: 'white',
        p: 4,
      }}
    >
      {/* Game UI */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5">Score: {score}</Typography>
        <Typography variant="h5">Time: {timeLeft}</Typography>
        <Typography variant="h5">Streak: {streak}</Typography>
      </Box>

      {/* Puzzle Info */}
      <Card sx={{ mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {currentPuzzleData.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {currentPuzzleData.description}
          </Typography>
          <Typography variant="body1">
            Reward: {currentPuzzleData.reward} points
          </Typography>
        </CardContent>
      </Card>

      {/* Puzzle Items */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {currentPuzzleData.items.map(item => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                backgroundColor: selectedItems.includes(item.id) 
                  ? 'rgba(76, 175, 80, 0.3)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: selectedItems.includes(item.id) 
                  ? '2px solid #4caf50' 
                  : '1px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                },
              }}
              onClick={() => selectItem(item.id)}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ color: item.color, fontSize: '2rem', mb: 1 }}>
                  {item.icon}
                </Box>
                <Typography variant="body2">
                  {item.type}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Power-ups */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {powerUps.map(powerUp => (
          <Chip
            key={powerUp.id}
            icon={powerUp.icon}
            label={powerUp.name}
            onClick={() => usePowerUp(powerUp.id)}
            sx={{
              backgroundColor: `${powerUp.color}20`,
              color: powerUp.color,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: powerUp.color,
                color: 'white',
              },
            }}
          />
        ))}
      </Box>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={submitSolution}
          disabled={selectedItems.length === 0}
          sx={{ px: 4, py: 2 }}
        >
          Submit Solution
        </Button>
      </Box>

      {/* Success Message */}
      {puzzleComplete && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" sx={{ color: '#4caf50', fontWeight: 700 }}>
            ✓ Puzzle Solved!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LogicPuzzleGame;
