import { createTheme } from '@mui/material/styles';

// Custom color palette for dark and light modes
const lightColors = {
  primary: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1565C0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9C27B0',
    light: '#BA68C8',
    dark: '#6A1B9A',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  text: {
    primary: '#1A202C',
    secondary: 'rgba(26, 32, 44, 0.7)',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
  info: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
  action: {
    hover: 'rgba(33, 150, 243, 0.08)',
    selected: 'rgba(33, 150, 243, 0.16)',
  },
};

const darkColors = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#f48fb1',
    light: '#fce4ec',
    dark: '#ad1457',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
  },
  warning: {
    main: '#ffb74d',
    light: '#ffcc02',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
  },
};

const createCustomTheme = (isDark) => {
  const colors = isDark ? darkColors : lightColors;
  
  return {
    palette: {
      mode: isDark ? 'dark' : 'light',
      ...colors,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: isDark ? 8 : 12,
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? '0 8px 25px rgba(144, 202, 249, 0.3)'
                : '0 8px 25px rgba(33, 150, 243, 0.25)',
            },
          },
          contained: {
            boxShadow: isDark
              ? '0 4px 14px 0 rgba(0, 0, 0, 0.3)'
              : '0 4px 14px 0 rgba(33, 150, 243, 0.2)',
            '&:hover': {
              boxShadow: isDark
                ? '0 8px 25px rgba(0, 0, 0, 0.15)'
                : '0 12px 30px rgba(33, 150, 243, 0.3)',
            },
          },
          outlined: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: isDark ? 16 : 20,
            boxShadow: isDark
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(33, 150, 243, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
            border: isDark ? 'none' : '1px solid rgba(33, 150, 243, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: isDark 
              ? 'rgba(30, 30, 30, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: isDark ? 'blur(10px)' : 'blur(20px)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark
                ? '0 16px 48px rgba(0, 0, 0, 0.4)'
                : '0 12px 40px rgba(33, 150, 243, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
              borderColor: isDark ? 'none' : 'rgba(33, 150, 243, 0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark 
              ? 'rgba(18, 18, 18, 0.9)' 
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: isDark 
              ? 'none' 
              : '1px solid rgba(33, 150, 243, 0.1)',
            boxShadow: isDark
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 2px 12px rgba(33, 150, 243, 0.08)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            },
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(createCustomTheme(false));
export const darkTheme = createTheme(createCustomTheme(true));
