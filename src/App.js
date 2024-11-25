// Imports necessary components from React Router library
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Import page and component files
import Home from './pages/Home';
import Demo from './pages/Demo';
import AppBar from './components/ui/navigation/AppBar';

// Define theme at app level
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fafaf9', // White for primary elements
    },
    secondary: {
      main: '#0c0a09', // Black for secondary elements
    },
    accent: {
      main: '#d97706', // Orange for accent/hover effects
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
      },
    },
  },
});

// AppBarWrapper needed because useLocation hook must be used inside Router
function AppBarWrapper() {
  const location = useLocation();
  return <AppBar showProject={location.pathname.startsWith('/demo')} />;
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <AppBarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
