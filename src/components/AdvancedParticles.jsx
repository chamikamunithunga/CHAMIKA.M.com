import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Slider, FormControl, InputLabel, Select, MenuItem, Paper, useTheme } from '@mui/material';
import { gsap } from 'gsap';

const AdvancedParticles = ({ children }) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [particleCount, setParticleCount] = useState(100);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [particleSize, setParticleSize] = useState(2);
  const [connectionDistance, setConnectionDistance] = useState(100);
  const [particleType, setParticleType] = useState('circles');

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * particleSpeed;
      this.vy = (Math.random() - 0.5) * particleSpeed;
      this.size = Math.random() * particleSize + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 360;
      this.life = 1;
      this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Mouse interaction
      const dx = mouseRef.current.x - this.x;
      const dy = mouseRef.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.vx -= dx * force * 0.001;
        this.vy -= dy * force * 0.001;
      }
      
      // Boundary collision
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
      
      // Keep particles in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
      
      // Life cycle
      this.life -= this.decay;
      if (this.life <= 0) {
        this.reset();
      }
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.vx = (Math.random() - 0.5) * particleSpeed;
      this.vy = (Math.random() - 0.5) * particleSpeed;
      this.life = 1;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity * this.life;
      
      if (particleType === 'circles') {
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (particleType === 'squares') {
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      } else if (particleType === 'triangles') {
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x - this.size, this.y + this.size);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.closePath();
        ctx.fill();
      }
      
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.save();
            ctx.globalAlpha = (connectionDistance - distance) / connectionDistance * 0.3;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleSpeed, particleSize, connectionDistance, particleType]);

  const handleParticleCountChange = (event, newValue) => {
    setParticleCount(newValue);
  };

  const handleParticleSpeedChange = (event, newValue) => {
    setParticleSpeed(newValue);
  };

  const handleParticleSizeChange = (event, newValue) => {
    setParticleSize(newValue);
  };

  const handleConnectionDistanceChange = (event, newValue) => {
    setConnectionDistance(newValue);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Controls */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          p: 2,
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          minWidth: 250
        }}
      >
        <Typography variant="h6" gutterBottom>
          🎨 Particle Controls
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Particle Count: {particleCount}</Typography>
          <Slider
            value={particleCount}
            onChange={handleParticleCountChange}
            min={10}
            max={500}
            step={10}
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Speed: {particleSpeed}</Typography>
          <Slider
            value={particleSpeed}
            onChange={handleParticleSpeedChange}
            min={0.1}
            max={5}
            step={0.1}
            sx={{ color: theme.palette.secondary.main }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Size: {particleSize}</Typography>
          <Slider
            value={particleSize}
            onChange={handleParticleSizeChange}
            min={1}
            max={10}
            step={0.5}
            sx={{ color: theme.palette.success.main }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Connection Distance: {connectionDistance}</Typography>
          <Slider
            value={connectionDistance}
            onChange={handleConnectionDistanceChange}
            min={50}
            max={200}
            step={10}
            sx={{ color: theme.palette.warning.main }}
          />
        </Box>

        <FormControl fullWidth size="small">
          <InputLabel sx={{ color: 'white' }}>Particle Type</InputLabel>
          <Select
            value={particleType}
            onChange={(e) => setParticleType(e.target.value)}
            sx={{ color: 'white' }}
          >
            <MenuItem value="circles">Circles</MenuItem>
            <MenuItem value="squares">Squares</MenuItem>
            <MenuItem value="triangles">Triangles</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdvancedParticles;
