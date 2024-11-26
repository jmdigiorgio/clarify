import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Define color constants to ensure consistency
const COLORS = {
  WHITE: '#fafaf9',
  PURE_WHITE: '#ffffff',
  BLACK: '#0c0a09',
  ORANGE: '#d97706',
};

// Define graph-specific styles
const graphStyles = {
  node: {
    container: {
      padding: '10px 20px',
      borderRadius: '3px',
      border: `1px solid ${COLORS.BLACK}`,
      background: COLORS.PURE_WHITE,
      minWidth: '150px',
    },
    handle: {
      width: '12px',
      height: '12px',
      background: COLORS.BLACK,
      borderRadius: '50%',
      border: `2px solid ${COLORS.PURE_WHITE}`,
    },
    label: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      color: COLORS.BLACK,
    },
  },
};

// Create and export theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.BLACK,
    },
    accent: {
      main: COLORS.ORANGE,
    },
    background: {
      default: COLORS.PURE_WHITE,
      paper: COLORS.WHITE,
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: COLORS.ORANGE,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: COLORS.ORANGE,
          },
        },
      },
    },
  },
  // Export graph styles as part of the theme
  graph: graphStyles,
});

export default theme;
