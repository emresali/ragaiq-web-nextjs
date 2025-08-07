// src/lib/theme/theme.ts
import { createTheme } from '@mui/material/styles';

// CSS Variables to match original design
const cssVars = {
  ragaiqPrimary: '#5ce1e6',
  ragaiqDark: '#0a0a0a',
  ragaiqLight: '#f9fafb',
  border: '#e5e7eb',
  muted: '#6b7280',
  mutedForeground: '#9ca3af',
  accent: '#f3f4f6',
  accentForeground: '#111827',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: cssVars.ragaiqPrimary,
      light: '#8ff3f8',
      dark: '#2eb0b5',
      contrastText: '#000',
    },
    secondary: {
      main: cssVars.ragaiqDark,
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
    background: {
      default: cssVars.ragaiqLight,
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 20px',
          borderRadius: '8px',
        },
        containedPrimary: {
          background: cssVars.ragaiqPrimary,
          '&:hover': {
            background: 'rgba(92, 225, 230, 0.9)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: cssVars.border,
            },
            '&:hover fieldset': {
              borderColor: cssVars.ragaiqPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: cssVars.ragaiqPrimary,
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});