// Imports necessary components from React Router library
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight

// Import page and component files
import Home from './pages/Home';
import Demo from './pages/Demo';
import AppBar from './components/AppBar';

// AppBarWrapper needed because useLocation hook must be used inside Router
function AppBarWrapper() {
  const location = useLocation();
  return <AppBar showProject={location.pathname.startsWith('/demo')} />;
}

function App() {
  return (
    <Router>
      <AppBarWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}

// Exports the App component as the default export
export default App;