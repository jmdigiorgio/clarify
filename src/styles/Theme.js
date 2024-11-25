import { createTheme } from '@mui/material/styles';

// Define color constants to ensure consistency
const COLORS = {
  WHITE: '#fafaf9',
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
