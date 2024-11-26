import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Define color constants to ensure consistency
const COLORS = {
  WHITE: '#fafaf9',
  PURE_WHITE: '#ffffff', // Adding pure white
  BLACK: '#0c0a09',
  ORANGE: '#d97706',
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
      default: COLORS.PURE_WHITE, // This will control the page background
      paper: COLORS.WHITE, // This keeps our components with the off-white
    },
  },
  // Rest of the theme configuration remains the same
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
});

export default theme;
