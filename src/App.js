// Imports necessary components from React Router library.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight


// Imports the Home component from the specified path. This will be rendered as the home page.
import Home from './pages/Home';

function App() {
  return (
      // <Router> - Wraps the entire app in a Router component. This provides routing functionality and listens for changes in the browser's address bar.
      // <Routes> - Encapsulates all the defined routes for the application. Only one route will render at a time based on the current path.
      // <Route> - Defines a single route: 'path' Specifies the URL path for this route. 'element' specifies the component to render when the user navigates to the path.
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

// Exports the App component as the default export, making it accessible to other files
// (e.g., `index.js`) where it will be rendered to the DOM.
export default App;
