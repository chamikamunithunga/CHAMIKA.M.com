import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography, Button, Card, CardContent, useTheme, Chip, Stack, Alert, Grid } from '@mui/material';
import {
  Favorite,
  Psychology,
  AutoAwesome,
  Speed,
  EmojiEvents,
  Refresh,
  CheckCircle,
  Cancel,
  Code,
  BugReport,
  RocketLaunch,
  Memory,
} from '@mui/icons-material';

const UltimateGameMashup = () => {
  const theme = useTheme();
  const gameRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [currentMode, setCurrentMode] = useState('heart');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameItems, setGameItems] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [player, setPlayer] = useState({ x: 50, y: 80 });
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [powerUps, setPowerUps] = useState([]);
  const [gameMode, setGameMode] = useState('hybrid'); // heart, collection, puzzle, hybrid

  const gameModes = [
    { id: 'heart', name: 'Heart Puzzles', icon: <Favorite />, color: '#ff1744' },
    { id: 'collection', name: 'Code Collection', icon: <Code />, color: '#61dafb' },
    { id: 'puzzle', name: 'Logic Puzzles', icon: <Psychology />, color: '#9c27b0' },
    { id: 'hybrid', name: 'Ultimate Mashup', icon: <AutoAwesome />, color: '#ff6b35' },
  ];

  const powerUpTypes = [
    { id: 1, name: 'Heart Boost', icon: <Favorite />, effect: 'heart', color: '#ff1744' },
    { id: 2, name: 'Code Shield', icon: <Code />, effect: 'shield', color: '#61dafb' },
    { id: 3, name: 'Logic Boost', icon: <Psychology />, effect: 'logic', color: '#9c27b0' },
    { id: 4, name: 'Time Freeze', icon: <Speed />, effect: 'freeze', color: '#00bcd4' },
    { id: 5, name: 'Score Multiplier', icon: <EmojiEvents />, effect: 'multiply', color: '#4caf50' },
  ];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setLevel(1);
    setCurrentPuzzle(null);
    setUserAnswer('');
    setGameItems([]);
    setBugs([]);
    setPlayer({ x: 50, y: 80 });
    setIsGameRunning(true);
    setPowerUps([]);
    
    if (gameMode === 'hybrid') {
      startHybridGame();
    } else {
      startSpecificGame();
    }
  };

  const startHybridGame = () => {
    // Crazy hybrid game logic that combines all game modes
    setInterval(() => {
      if (!isGameRunning) return;
      
      // Randomly switch between game modes
      const modes = ['heart', 'collection', 'puzzle'];
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      setCurrentMode(randomMode);
      
      // Spawn different elements based on mode
      switch (randomMode) {
        case 'heart':
          fetchHeartPuzzle();
          break;
        case 'collection':
          spawnCodeItem();
          break;
        case 'puzzle':
          spawnLogicPuzzle();
          break;
      }
    }, 5000);
  };

  const startSpecificGame = () => {
    switch (gameMode) {
      case 'heart':
        fetchHeartPuzzle();
        break;
      case 'collection':
        startCollectionMode();
        break;
      case 'puzzle':
        startPuzzleMode();
        break;
    }
  };

  const fetchHeartPuzzle = async () => {
    try {
      const response = await fetch('http://marcconrad.com/uob/heart/api.php?out=json');
      const data = await response.json();
      setCurrentPuzzle(data);
    } catch (error) {
      console.error('Error fetching heart puzzle:', error);
    }
  };

  const spawnCodeItem = () => {
    const items = [
      { icon: <Code />, name: 'React', points: 10, color: '#61dafb' },
      { icon: <AutoAwesome />, name: 'JavaScript', points: 15, color: '#f7df1e' },
      { icon: <RocketLaunch />, name: 'Node.js', points: 20, color: '#339933' },
    ];
    
    const newItem = {
      ...items[Math.floor(Math.random() * items.length)],
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: -10,
      vx: (Math.random() - 0.5) * 2,
      vy: 1 + Math.random() * 2,
    };
    
    setGameItems(prev => [...prev, newItem]);
  };

  const spawnLogicPuzzle = () => {
    const puzzles = [
      { question: '2 + 2 = ?', answer: '4', type: 'math' },
      { question: 'What is the capital of France?', answer: 'Paris', type: 'trivia' },
      { question: 'Binary: 1010 = ?', answer: '10', type: 'binary' },
    ];
    
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setCurrentPuzzle(puzzle);
  };

  const spawnBug = () => {
    const newBug = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: -10,
      vx: (Math.random() - 0.5) * 3,
      vy: 1.5 + Math.random() * 2,
      type: 'bug',
      damage: 1,
    };
    
    setBugs(prev => [...prev, newBug]);
  };

  const spawnPowerUp = () => {
    const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    const newPowerUp = {
      ...powerUp,
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      active: false,
    };
    
    setPowerUps(prev => [...prev, newPowerUp]);
  };

  const usePowerUp = (powerUp) => {
    setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
    
    switch (powerUp.effect) {
      case 'heart':
        setLives(prev => Math.min(prev + 1, 5));
        break;
      case 'shield':
        // Temporary invincibility
        break;
      case 'logic':
        setScore(prev => prev + 100);
        break;
      case 'freeze':
        setTimeLeft(prev => prev + 15);
        break;
      case 'multiply':
        setScore(prev => prev * 2);
        break;
    }
  };

  const submitAnswer = () => {
    if (!currentPuzzle || !userAnswer.trim()) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === currentPuzzle.solution?.toString().toLowerCase() || 
                     userAnswer.trim() === currentPuzzle.answer?.toString();
    
    if (isCorrect) {
      setScore(prev => prev + 50);
      setUserAnswer('');
      setCurrentPuzzle(null);
      createSuccessEffect();
    } else {
      setLives(prev => prev - 1);
      createFailureEffect();
    }
  };

  const createSuccessEffect = () => {
    // Crazy multi-mode success effect
    gsap.to(gameRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 2,
      ease: "power2.inOut"
    });

    // Mixed particle effects
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const emojis = ['❤️', '💻', '🧠', '🎯', '⭐'];
      particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.position = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.fontSize = '1.5rem';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      gameRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360,
        duration: 2,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  };

  const createFailureEffect = () => {
    gsap.to(gameRef.current, {
      rotation: "random(-5, 5)",
      duration: 0.1,
      repeat: 10,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  // Game loop for collection mode
  useEffect(() => {
    if (gameMode === 'collection' || gameMode === 'hybrid') {
      const loop = setInterval(() => {
        if (!isGameRunning) return;
        
        // Update items
        setGameItems(prev => prev.map(item => ({
          ...item,
          x: item.x + item.vx * 0.1,
          y: item.y + item.vy * 0.1,
        })).filter(item => item.y < 120));
        
        // Update bugs
        setBugs(prev => prev.map(bug => ({
          ...bug,
          x: bug.x + bug.vx * 0.1,
          y: bug.y + bug.vy * 0.1,
        })).filter(bug => bug.y < 120));
        
        // Collision detection
        gameItems.forEach(item => {
          const distance = Math.sqrt(
            Math.pow(item.x - player.x, 2) + Math.pow(item.y - player.y, 2)
          );
          
          if (distance < 15) {
            setScore(prev => prev + item.points);
            setGameItems(prev => prev.filter(i => i.id !== item.id));
          }
        });
        
        // Bug collision
        bugs.forEach(bug => {
          const distance = Math.sqrt(
            Math.pow(bug.x - player.x, 2) + Math.pow(bug.y - player.y, 2)
          );
          
          if (distance < 15) {
            setLives(prev => prev - bug.damage);
            setBugs(prev => prev.filter(b => b.id !== bug.id));
          }
        });
      }, 50);
      
      return () => clearInterval(loop);
    }
  }, [isGameRunning, gameMode, gameItems, bugs, player]);

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            setIsGameRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  if (gameState === 'menu') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff1744 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 700, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              🎮 Ultimate Game Mashup
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Experience all games combined into one crazy adventure!
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Choose Game Mode:</Typography>
              <Grid container spacing={2} justifyContent="center">
                {gameModes.map((mode) => (
                  <Grid item xs={6} sm={3} key={mode.id}>
                    <Card
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        backgroundColor: gameMode === mode.id ? `${mode.color}30` : 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${mode.color}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          backgroundColor: `${mode.color}30`,
                        },
                      }}
                      onClick={() => setGameMode(mode.id)}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ color: mode.color, fontSize: '2rem', mb: 1 }}>
                          {mode.icon}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {mode.name}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Multiple game modes in one experience</Typography>
              <Typography variant="body1">• Real API-powered heart puzzles</Typography>
              <Typography variant="body1">• Dynamic game switching</Typography>
              <Typography variant="body1">• Crazy power-ups and effects</Typography>
            </Stack>
            
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ 
                px: 4, 
                py: 2,
                background: 'linear-gradient(45deg, #ff6b35, #ff1744)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff1744, #ff6b35)',
                },
              }}
            >
              Start Ultimate Game
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
          background: `linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              🎉 Game Over!
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Final Score: {score}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Level Reached: {level}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setGameState('menu')}
              sx={{ px: 4, py: 2 }}
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      ref={gameRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: `linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff1744 100%)`,
        color: 'white',
        p: 4,
        overflow: 'hidden',
      }}
    >
      {/* Game UI */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5">Score: {score}</Typography>
        <Typography variant="h5">Lives: {lives}</Typography>
        <Typography variant="h5">Time: {timeLeft}</Typography>
        <Typography variant="h5">Level: {level}</Typography>
        <Typography variant="h5">Mode: {currentMode}</Typography>
      </Box>

      {/* Power-ups */}
      {powerUps.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {powerUps.map(powerUp => (
            <Chip
              key={powerUp.id}
              icon={powerUp.icon}
              label={powerUp.name}
              onClick={() => usePowerUp(powerUp)}
              sx={{
                backgroundColor: `${powerUp.color}30`,
                color: 'white',
                border: `1px solid ${powerUp.color}`,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: powerUp.color,
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Game Content */}
      {(currentMode === 'heart' || currentMode === 'puzzle') && currentPuzzle && (
        <Card sx={{ mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              {currentMode === 'heart' ? '💖 Heart Puzzle' : '🧠 Logic Puzzle'}
            </Typography>
            
            {currentMode === 'heart' && currentPuzzle.question && (
              <Box sx={{ mb: 3 }}>
                <img 
                  src={currentPuzzle.question} 
                  alt="Heart Puzzle" 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }} 
                />
              </Box>
            )}
            
            {currentMode === 'puzzle' && currentPuzzle.question && (
              <Typography variant="h6" sx={{ mb: 3 }}>
                {currentPuzzle.question}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                }}
              />
              <Button
                variant="contained"
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Collection Mode Elements */}
      {(currentMode === 'collection' || currentMode === 'hybrid') && (
        <>
          {/* Player */}
          <Box
            sx={{
              position: 'absolute',
              left: `${player.x}%`,
              top: `${player.y}%`,
              width: 30,
              height: 30,
              backgroundColor: theme.palette.primary.main,
              borderRadius: '50%',
              zIndex: 50,
              boxShadow: '0 0 20px rgba(144, 202, 249, 0.8)',
              transition: 'all 0.1s ease',
            }}
          />

          {/* Game Items */}
          {gameItems.map(item => (
            <Box
              key={item.id}
              sx={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                color: item.color,
                fontSize: '2rem',
                zIndex: 40,
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
              }}
            >
              {item.icon}
            </Box>
          ))}

          {/* Bugs */}
          {bugs.map(bug => (
            <Box
              key={bug.id}
              sx={{
                position: 'absolute',
                left: `${bug.x}%`,
                top: `${bug.y}%`,
                color: '#f44336',
                fontSize: '1.5rem',
                zIndex: 45,
                filter: 'drop-shadow(0 0 10px rgba(244, 67, 54, 0.8))',
              }}
            >
              <BugReport />
            </Box>
          ))}
        </>
      )}

      {/* Game Over Check */}
      {lives <= 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => setGameState('gameOver')}
            sx={{ px: 4, py: 2 }}
          >
            Game Over
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UltimateGameMashup;
