import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';

import Home from './pages/Home';
import Graph from './pages/Graph';
import ClarifyButton from './components/ui/buttons/ClarifyButton';
import theme from './styles/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <ClarifyButton />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
