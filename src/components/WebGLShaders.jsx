import React, { useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const WebGLShaders = ({ children }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.log('WebGL not supported');
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 position;
      attribute vec2 texCoord;
      varying vec2 vTexCoord;
      uniform float time;
      
      void main() {
        vTexCoord = texCoord;
        vec2 pos = position;
        pos.y += sin(pos.x * 3.0 + time) * 0.1;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 vTexCoord;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = vTexCoord;
        
        // Create animated gradient
        vec3 color1 = vec3(1.0, 0.4, 0.4); // Red
        vec3 color2 = vec3(0.4, 0.8, 0.8); // Cyan
        vec3 color3 = vec3(0.8, 0.4, 1.0); // Purple
        
        // Animate the gradient
        float t = sin(time * 0.5) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, t);
        color = mix(color, color3, sin(time * 0.3) * 0.5 + 0.5);
        
        // Add some noise
        float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.1;
        color += noise;
        
        // Add some sparkles
        float sparkle = sin(uv.x * 50.0 + time * 2.0) * sin(uv.y * 50.0 + time * 2.0);
        sparkle = step(0.98, sparkle);
        color += sparkle * vec3(1.0);
        
        gl_FragColor = vec4(color, 0.8);
      }
    `;

    // Create shader
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    // Create program
    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) return;

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'position');
    const texCoordLocation = gl.getAttribLocation(program, 'texCoord');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    // Animation loop
    let startTime = Date.now();
    
    function animate() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Set uniforms
      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      // Set up position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Set up texture coordinate attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.3
        }}
        width={800}
        height={600}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default WebGLShaders;
