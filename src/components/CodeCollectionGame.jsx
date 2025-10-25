import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography, Button, Card, CardContent, useTheme, Chip, Stack } from '@mui/material';
import {
  Code,
  BugReport,
  AutoAwesome,
  Speed,
  Psychology,
  Security,
  RocketLaunch,
  Lightbulb,
} from '@mui/icons-material';

const CodeCollectionGame = () => {
  const theme = useTheme();
  const gameRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [collectedItems, setCollectedItems] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [player, setPlayer] = useState({ x: 50, y: 80 });
  const [isGameRunning, setIsGameRunning] = useState(false);

  const gameItems = [
    { icon: <Code />, name: 'React', points: 10, color: '#61dafb', rarity: 'common' },
    { icon: <AutoAwesome />, name: 'JavaScript', points: 15, color: '#f7df1e', rarity: 'common' },
    { icon: <RocketLaunch />, name: 'Node.js', points: 20, color: '#339933', rarity: 'uncommon' },
    { icon: <Security />, name: 'TypeScript', points: 25, color: '#3178c6', rarity: 'uncommon' },
    { icon: <Speed />, name: 'Vite', points: 30, color: '#646cff', rarity: 'rare' },
    { icon: <Psychology />, name: 'AI/ML', points: 50, color: '#ff6b6b', rarity: 'legendary' },
    { icon: <Lightbulb />, name: 'Innovation', points: 100, color: '#ffd93d', rarity: 'legendary' },
  ];

  const bugTypes = [
    { icon: <BugReport />, name: 'Syntax Error', damage: 1, color: '#f44336' },
    { icon: <BugReport />, name: 'Logic Bug', damage: 2, color: '#ff5722' },
    { icon: <BugReport />, name: 'Memory Leak', damage: 3, color: '#9c27b0' },
  ];

  // Game initialization
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setLives(3);
    setTimeLeft(60);
    setGameSpeed(1);
    setCollectedItems([]);
    setBugs([]);
    setPlayer({ x: 50, y: 80 });
    setIsGameRunning(true);
    startGameLoop();
  };

  // Crazy game logic - items spawn with unique patterns
  const spawnItem = () => {
    const newItem = {
      ...gameItems[Math.floor(Math.random() * gameItems.length)],
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -10,
      vx: (Math.random() - 0.5) * 2,
      vy: gameSpeed * (0.5 + Math.random() * 1.5),
      rotation: 0,
      scale: 0.5 + Math.random() * 0.5,
    };

    setCollectedItems(prev => [...prev, newItem]);

    // Crazy logic: Rare items move in figure-8 patterns
    if (newItem.rarity === 'rare' || newItem.rarity === 'legendary') {
      gsap.to(newItem, {
        x: newItem.x + Math.sin(Date.now() * 0.001) * 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };

  // Spawn bugs with crazy AI behavior
  const spawnBug = () => {
    const newBug = {
      ...bugTypes[Math.floor(Math.random() * bugTypes.length)],
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -10,
      vx: (Math.random() - 0.5) * 3,
      vy: gameSpeed * (1 + Math.random() * 2),
      rotation: 0,
      targetPlayer: false, // AI behavior flag
    };

    setBugs(prev => [...prev, newBug]);

    // Crazy AI: Bugs sometimes target the player
    if (Math.random() < 0.3) {
      newBug.targetPlayer = true;
      gsap.to(newBug, {
        x: player.x + (Math.random() - 0.5) * 10,
        y: player.y + (Math.random() - 0.5) * 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  };

  // Game loop with crazy physics
  const gameLoop = () => {
    if (!isGameRunning) return;

    // Update items
    setCollectedItems(prev => prev.map(item => ({
      ...item,
      x: item.x + item.vx * 0.1,
      y: item.y + item.vy * 0.1,
      rotation: item.rotation + 2,
    })).filter(item => item.y < 120));

    // Update bugs
    setBugs(prev => prev.map(bug => ({
      ...bug,
      x: bug.x + bug.vx * 0.1,
      y: bug.y + bug.vy * 0.1,
      rotation: bug.rotation + 3,
    })).filter(bug => bug.y < 120));

    // Collision detection with crazy logic
    collectedItems.forEach(item => {
      const distance = Math.sqrt(
        Math.pow(item.x - player.x, 2) + Math.pow(item.y - player.y, 2)
      );
      
      if (distance < 15) {
        // Crazy bonus system
        let bonusPoints = item.points;
        if (item.rarity === 'legendary') {
          bonusPoints *= 2;
          setLives(prev => Math.min(prev + 1, 5)); // Legendary items give extra life
        }
        if (item.rarity === 'rare') {
          bonusPoints *= 1.5;
        }
        
        setScore(prev => prev + bonusPoints);
        setCollectedItems(prev => prev.filter(i => i.id !== item.id));
        
        // Crazy particle effect
        createParticleEffect(item.x, item.y, item.color);
      }
    });

    // Bug collision with crazy consequences
    bugs.forEach(bug => {
      const distance = Math.sqrt(
        Math.pow(bug.x - player.x, 2) + Math.pow(bug.y - player.y, 2)
      );
      
      if (distance < 15) {
        setLives(prev => prev - bug.damage);
        setBugs(prev => prev.filter(b => b.id !== bug.id));
        
        // Crazy screen shake effect
        gsap.to(gameRef.current, {
          x: "random(-10, 10)",
          y: "random(-10, 10)",
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    });

    // Level progression with crazy difficulty scaling
    if (score > level * 100) {
      setLevel(prev => prev + 1);
      setGameSpeed(prev => prev + 0.2);
      setTimeLeft(prev => prev + 10); // Bonus time
    }

    // Spawn rate increases with level
    if (Math.random() < 0.02 * level) spawnItem();
    if (Math.random() < 0.015 * level) spawnBug();
  };

  // Create particle effects
  const createParticleEffect = (x, y, color) => {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      gameRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  };

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && isGameRunning) {
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
  }, [gameState, isGameRunning]);

  // Game loop
  useEffect(() => {
    if (isGameRunning) {
      const loop = setInterval(gameLoop, 50);
      return () => clearInterval(loop);
    }
  }, [isGameRunning, collectedItems, bugs, player, score, level]);

  // Player movement with crazy physics
  const movePlayer = (direction) => {
    if (!isGameRunning) return;
    
    setPlayer(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'left':
          newX = Math.max(10, prev.x - 5);
          break;
        case 'right':
          newX = Math.min(90, prev.x + 5);
          break;
        case 'up':
          newY = Math.max(20, prev.y - 5);
          break;
        case 'down':
          newY = Math.min(90, prev.y + 5);
          break;
      }
      
      return { x: newX, y: newY };
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
          movePlayer('left');
          break;
        case 'd':
        case 'arrowright':
          movePlayer('right');
          break;
        case 'w':
        case 'arrowup':
          movePlayer('up');
          break;
        case 's':
        case 'arrowdown':
          movePlayer('down');
          break;
        case ' ':
          e.preventDefault();
          if (gameState === 'playing') {
            setGameState('paused');
            setIsGameRunning(false);
          } else if (gameState === 'paused') {
            setGameState('playing');
            setIsGameRunning(true);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isGameRunning]);

  const startGameLoop = () => {
    setInterval(() => {
      if (Math.random() < 0.3) spawnItem();
      if (Math.random() < 0.2) spawnBug();
    }, 1000);
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
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              🎮 Code Collection Game
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Collect programming concepts, avoid bugs, and level up!
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Use WASD or Arrow Keys to move</Typography>
              <Typography variant="body1">• Collect code items for points</Typography>
              <Typography variant="body1">• Avoid bugs to stay alive</Typography>
              <Typography variant="body1">• Press SPACE to pause</Typography>
              <Typography variant="body1">• Rare items give bonus effects!</Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ px: 4, py: 2 }}
            >
              Start Game
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
          background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              Game Over!
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

  return (
    <Box
      ref={gameRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Game UI */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100, color: 'white' }}>
        <Typography variant="h5">Score: {score}</Typography>
        <Typography variant="h6">Level: {level}</Typography>
        <Typography variant="h6">Lives: {lives}</Typography>
        <Typography variant="h6">Time: {timeLeft}</Typography>
      </Box>

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

      {/* Collected Items */}
      {collectedItems.map(item => (
        <Box
          key={item.id}
          sx={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            color: item.color,
            fontSize: '2rem',
            zIndex: 40,
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
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
            color: bug.color,
            fontSize: '1.5rem',
            zIndex: 45,
            transform: `rotate(${bug.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px rgba(244, 67, 54, 0.8))',
          }}
        >
          {bug.icon}
        </Box>
      ))}

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

export default CodeCollectionGame;
