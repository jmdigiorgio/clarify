// Imports necessary components from React Router library
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

// Import page and component files
import Home from './pages/Home';
import Demo from './pages/Demo';
import AppBar from './components/ui/navigation/AppBar';
import theme from './styles/Theme'; // This will now include font imports

// AppBarWrapper needed because useLocation hook must be used inside Router
function AppBarWrapper() {
  const location = useLocation();
  return <AppBar showProject={location.pathname.startsWith('/demo')} />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
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
