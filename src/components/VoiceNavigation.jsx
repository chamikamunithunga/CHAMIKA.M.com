import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, Chip, Paper, useTheme } from '@mui/material';
import { Mic, MicOff, VolumeUp } from '@mui/icons-material';

const VoiceNavigation = ({ onNavigate }) => {
  const theme = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          handleVoiceCommand(finalTranscript.toLowerCase());
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceCommand = (command) => {
    setLastCommand(command);
    
    // Voice commands mapping
    const commands = {
      'go home': () => onNavigate('home'),
      'go to home': () => onNavigate('home'),
      'show home': () => onNavigate('home'),
      'about': () => onNavigate('about'),
      'go to about': () => onNavigate('about'),
      'show about': () => onNavigate('about'),
      'projects': () => onNavigate('projects'),
      'go to projects': () => onNavigate('projects'),
      'show projects': () => onNavigate('projects'),
      'contact': () => onNavigate('contact'),
      'go to contact': () => onNavigate('contact'),
      'show contact': () => onNavigate('contact'),
      'games': () => onNavigate('games'),
      'go to games': () => onNavigate('games'),
      'show games': () => onNavigate('games'),
      'play games': () => onNavigate('games'),
      'portfolio': () => onNavigate('home'),
      'go to portfolio': () => onNavigate('home'),
      'show portfolio': () => onNavigate('home'),
    };

    // Check for exact matches first
    if (commands[command]) {
      commands[command]();
      return;
    }

    // Check for partial matches
    for (const [key, action] of Object.entries(commands)) {
      if (command.includes(key) || key.includes(command)) {
        action();
        return;
      }
    }

    // Handle navigation commands
    if (command.includes('scroll') || command.includes('move')) {
      if (command.includes('up') || command.includes('top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (command.includes('down') || command.includes('bottom')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const speakCommand = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          🎤 Voice Control
        </Typography>
        
        <IconButton
          onClick={toggleListening}
          sx={{
            backgroundColor: isListening ? theme.palette.error.main : theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: isListening ? theme.palette.error.dark : theme.palette.primary.dark,
            },
            animation: isListening ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        >
          {isListening ? <MicOff /> : <Mic />}
        </IconButton>

        {transcript && (
          <Chip
            label={transcript}
            size="small"
            sx={{ maxWidth: 200, textAlign: 'center' }}
          />
        )}

        {lastCommand && (
          <Chip
            label={`Last: ${lastCommand}`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}

        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 200 }}>
          Try saying: "go to projects", "show games", "about me"
        </Typography>
      </Paper>
    </Box>
  );
};

export default VoiceNavigation;
