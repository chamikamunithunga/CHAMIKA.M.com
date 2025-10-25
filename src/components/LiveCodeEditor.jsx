import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, IconButton, useTheme } from '@mui/material';
import { PlayArrow, Stop, Code, ContentCopy, Check } from '@mui/icons-material';

const LiveCodeEditor = () => {
  const theme = useTheme();
  const [code, setCode] = useState(`// Welcome to the Live Code Editor!
// Try editing this code and see the magic happen!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Capture console.log output
    const originalLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
    };

    try {
      // Create a safe execution environment
      const func = new Function(code);
      func();
      setOutput(logs.join('\n'));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = [
    {
      title: "React Component",
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
    },
    {
      title: "Async Function",
      code: `async function fetchData() {
  try {
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json();
    console.log('User:', data.login);
    console.log('Followers:', data.followers);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

fetchData();`
    },
    {
      title: "Algorithm",
      code: `// Quick Sort Algorithm
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Sorted:', quickSort(numbers));`
    }
  ];

  const loadExample = (example) => {
    setCode(example.code);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 3
      }}>
        🚀 Live Code Editor
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {codeExamples.map((example, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => loadExample(example)}
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
              }
            }}
          >
            {example.title}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {/* Code Editor */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code /> Code Editor
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={copyCode} color="primary">
                {copied ? <Check /> : <ContentCopy />}
              </IconButton>
              <Button
                variant="contained"
                startIcon={isRunning ? <Stop /> : <PlayArrow />}
                onClick={executeCode}
                disabled={isRunning}
                sx={{ 
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5252, #26a69a)'
                  }
                }}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            border: '1px solid #333',
            borderRadius: 1,
            overflow: 'hidden',
            height: '400px'
          }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                padding: '16px',
                border: 'none',
                outline: 'none',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                resize: 'none'
              }}
              placeholder="Write your JavaScript code here..."
            />
          </Box>
        </Paper>

        {/* Output */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            📊 Output
          </Typography>
          
          <Box sx={{ 
            border: '1px solid #333',
            borderRadius: 1,
            height: '400px',
            overflow: 'auto',
            backgroundColor: '#1e1e1e',
            p: 2
          }}>
            {output ? (
              <pre style={{ 
                margin: 0, 
                color: '#d4d4d4',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}>
                {output}
              </pre>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Click "Run Code" to see the output here...
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          💡 Code Examples
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {codeExamples.map((example, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {example.title}
              </Typography>
              <Box sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
                padding: 2,
                borderRadius: 1,
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '12px',
                maxHeight: '200px',
                overflow: 'auto',
                border: '1px solid #ddd'
              }}>
                <pre style={{ margin: 0, color: theme.palette.text.primary }}>
                  {example.code}
                </pre>
              </Box>
              <Button
                size="small"
                onClick={() => loadExample(example)}
                sx={{ mt: 1 }}
              >
                Load Example
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LiveCodeEditor;
