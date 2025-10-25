import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography, Button, Card, CardContent, useTheme, TextField, Chip, Stack, Alert } from '@mui/material';
import {
  Favorite,
  Psychology,
  AutoAwesome,
  Speed,
  EmojiEvents,
  Refresh,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';

const HeartPuzzleGame = () => {
  const theme = useTheme();
  const gameRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalSolved, setTotalSolved] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [difficulty, setDifficulty] = useState('normal');
  const [powerUps, setPowerUps] = useState([]);
  const [hints, setHints] = useState(3);

  const difficulties = [
    { name: 'Easy', timeLimit: 45, points: 50, color: '#4caf50' },
    { name: 'Normal', timeLimit: 30, points: 100, color: '#2196f3' },
    { name: 'Hard', timeLimit: 20, points: 200, color: '#f44336' },
    { name: 'Expert', timeLimit: 15, points: 500, color: '#9c27b0' },
  ];

  const powerUpTypes = [
    { id: 1, name: 'Time Boost', icon: <Speed />, effect: 'time', cost: 50, color: '#00bcd4' },
    { id: 2, name: 'Hint', icon: <Psychology />, effect: 'hint', cost: 100, color: '#ff9800' },
    { id: 3, name: 'Skip', icon: <Refresh />, effect: 'skip', cost: 150, color: '#e91e63' },
    { id: 4, name: 'Double Points', icon: <EmojiEvents />, effect: 'double', cost: 200, color: '#4caf50' },
  ];

  const fetchPuzzle = async () => {
    setIsLoading(true);
    try {
      // Use a CORS proxy to bypass the CORS issue
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = 'http://marcconrad.com/uob/heart/api.php?out=json';
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setCurrentPuzzle(data);
      setUserAnswer('');
      setFeedback(null);
      setTimeLeft(difficulties.find(d => d.name === difficulty).timeLimit);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
      // Fallback to mock data if API fails
      const mockData = {
        question: "What is 15 + 27?",
        solution: "42",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjE1ICsgMjcgPSA/PC90ZXh0Pjwvc3ZnPg=="
      };
      setCurrentPuzzle(mockData);
      setUserAnswer('');
      setFeedback(null);
      setTimeLeft(difficulties.find(d => d.name === difficulty).timeLimit);
      setFeedback({ type: 'info', message: 'Using demo puzzle due to API limitations.' });
    } finally {
      setIsLoading(false);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setTotalSolved(0);
    setHints(3);
    setPowerUps([]);
    fetchPuzzle();
  };

  const submitAnswer = () => {
    if (!currentPuzzle || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim() === currentPuzzle.solution.toString();
    
    if (isCorrect) {
      // Crazy success effects
      setFeedback({ type: 'success', message: 'Correct! Well done!' });
      setScore(prev => {
        const basePoints = difficulties.find(d => d.name === difficulty).points;
        const streakBonus = streak * 10;
        const timeBonus = Math.floor(timeLeft * 2);
        return prev + basePoints + streakBonus + timeBonus;
      });
      setStreak(prev => prev + 1);
      setTotalSolved(prev => prev + 1);
      
      // Crazy particle effect
      createSuccessEffect();
      
      // Auto advance after delay
      setTimeout(() => {
        fetchPuzzle();
      }, 2000);
    } else {
      // Crazy failure effects
      setFeedback({ type: 'error', message: `Wrong! The answer was ${currentPuzzle.solution}` });
      setStreak(0);
      createFailureEffect();
      
      // Auto advance after delay
      setTimeout(() => {
        fetchPuzzle();
      }, 3000);
    }
  };

  const usePowerUp = (powerUp) => {
    if (score < powerUp.cost) return;

    setScore(prev => prev - powerUp.cost);
    setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));

    switch (powerUp.effect) {
      case 'time':
        setTimeLeft(prev => prev + 10);
        break;
      case 'hint':
        if (hints > 0) {
          setHints(prev => prev - 1);
          // Show a hint
          setFeedback({ 
            type: 'info', 
            message: `Hint: The answer is between ${Math.max(0, currentPuzzle.solution - 5)} and ${currentPuzzle.solution + 5}` 
          });
        }
        break;
      case 'skip':
        fetchPuzzle();
        break;
      case 'double':
        setPowerUps(prev => [...prev, { ...powerUp, id: Date.now(), active: true }]);
        break;
    }
  };

  const createSuccessEffect = () => {
    // Crazy success animation
    gsap.to(gameRef.current, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 2,
      ease: "power2.inOut"
    });

    // Heart particle explosion
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.innerHTML = '❤️';
      particle.style.position = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.fontSize = '2rem';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      gameRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
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
    // Crazy failure animation
    gsap.to(gameRef.current, {
      rotation: "random(-3, 3)",
      duration: 0.1,
      repeat: 8,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up - crazy penalty
            setFeedback({ type: 'error', message: 'Time\'s up! Moving to next puzzle...' });
            setStreak(0);
            setTimeout(() => {
              fetchPuzzle();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  // Auto-generate power-ups
  useEffect(() => {
    if (gameState === 'playing' && Math.random() < 0.1) {
      const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      setPowerUps(prev => [...prev, { ...powerUp, id: Date.now() }]);
    }
  }, [totalSolved, gameState]);

  if (gameState === 'menu') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, #ff1744 0%, #e91e63 50%, #9c27b0 100%)`,
          color: 'white',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 600, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              💖 Heart Puzzle Game
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Solve mathematical puzzles hidden in beautiful heart shapes!
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Choose Difficulty:</Typography>
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
                {difficulties.map((diff) => (
                  <Chip
                    key={diff.name}
                    label={`${diff.name} (${diff.timeLimit}s)`}
                    onClick={() => setDifficulty(diff.name)}
                    sx={{
                      backgroundColor: difficulty === diff.name ? diff.color : 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: `2px solid ${diff.color}`,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: diff.color,
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Solve mathematical puzzles in heart shapes</Typography>
              <Typography variant="body1">• Use power-ups for crazy effects</Typography>
              <Typography variant="body1">• Build streaks for bonus points</Typography>
              <Typography variant="body1">• Real API-powered puzzles!</Typography>
            </Stack>
            
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ 
                px: 4, 
                py: 2,
                background: 'linear-gradient(45deg, #ff1744, #e91e63)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #e91e63, #ff1744)',
                },
              }}
            >
              Start Heart Puzzle
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
        background: `linear-gradient(135deg, #ff1744 0%, #e91e63 50%, #9c27b0 100%)`,
        color: 'white',
        p: 4,
      }}
    >
      {/* Game UI */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5">Score: {score}</Typography>
        <Typography variant="h5">Streak: {streak}</Typography>
        <Typography variant="h5">Solved: {totalSolved}</Typography>
        <Typography variant="h5">Time: {timeLeft}</Typography>
        <Typography variant="h5">Hints: {hints}</Typography>
      </Box>

      {/* Power-ups */}
      {powerUps.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {powerUps.map(powerUp => (
            <Chip
              key={powerUp.id}
              icon={powerUp.icon}
              label={`${powerUp.name} (${powerUp.cost} pts)`}
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

      {/* Puzzle Display */}
      <Card sx={{ mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          {isLoading ? (
            <Typography variant="h4">Loading puzzle...</Typography>
          ) : currentPuzzle ? (
            <>
              <Typography variant="h4" sx={{ mb: 3 }}>
                💖 Heart Puzzle Challenge
              </Typography>
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
              <Typography variant="h6" sx={{ mb: 3 }}>
                What's the answer to this heart puzzle?
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <TextField
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                    },
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

              <Button
                variant="outlined"
                onClick={fetchPuzzle}
                startIcon={<Refresh />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Skip Puzzle
              </Button>
            </>
          ) : (
            <Typography variant="h4">No puzzle loaded</Typography>
          )}
        </CardContent>
      </Card>

      {/* Feedback */}
      {feedback && (
        <Alert 
          severity={feedback.type} 
          sx={{ 
            mb: 4,
            backgroundColor: feedback.type === 'success' ? '#4caf50' : 
                           feedback.type === 'error' ? '#f44336' : '#2196f3',
            color: 'white',
          }}
        >
          {feedback.message}
        </Alert>
      )}

      {/* Game Over / Stats */}
      {totalSolved >= 10 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            🎉 Heart Puzzle Master!
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            You've solved {totalSolved} puzzles with a score of {score}!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setGameState('menu')}
            sx={{ px: 4, py: 2 }}
          >
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HeartPuzzleGame;
