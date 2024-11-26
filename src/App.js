// Import necessary components and functions from libraries and files
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// `react-router-dom` provides tools for navigation and routing in a React app.
// `BrowserRouter` is the main wrapper for routing. `Route` defines individual paths, and `Routes` groups them.

import { ThemeProvider } from '@mui/material/styles';
// `ThemeProvider` is a component from Material-UI that lets us apply a consistent theme to the app.

import { AppBar, Toolbar } from '@mui/material';
// `AppBar` and `Toolbar` are Material-UI components used to create a top navigation bar.

import Home from './pages/Home';
// Importing the `Home` component, which will be the main page displayed at the root URL ("/").

import Graph from './pages/Graph';
// Importing the `Graph` component, which will be displayed at the "/graph" URL.

import ClarifyButton from './components/ui/buttons/ClarifyButton';
// Importing a custom button component that will be added to the AppBar (likely for navigation or actions).

import theme from './styles/Theme';
// Importing a custom Material-UI theme. This defines colors, typography, and other styles for the app.

// Define the main application component
function App() {
  return (
    // Wrapping the entire app with the `ThemeProvider` to apply the custom theme.
    <ThemeProvider theme={theme}>
      {/* The `Router` component wraps everything that needs access to routing. */}
      <Router>
        {/* Create a fixed navigation bar using `AppBar`. 
            `position="fixed"` ensures it stays at the top of the viewport even when scrolling. 
            `color="secondary"` applies a secondary theme color to the AppBar. */}
        <AppBar position="fixed" color="secondary">
          {/* `Toolbar` is used inside the `AppBar` for proper layout and spacing of its content. */}
          <Toolbar>
            {/* Add the `ClarifyButton` component to the AppBar. */}
            <ClarifyButton />
          </Toolbar>
        </AppBar>
        {/* Define the routes for the app using `Routes` and `Route`. 
            Each `Route` specifies a URL path and the component to render for that path. */}
        <Routes>
          {/* Render the `Home` component when the user navigates to the root URL ("/"). */}
          <Route path="/" element={<Home />} />
          {/* Render the `Graph` component when the user navigates to the "/graph" URL. */}
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// Export the `App` component so it can be used in other parts of the project, such as `index.js`.
export default App;
