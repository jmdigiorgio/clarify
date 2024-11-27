// Import the `createTheme` function from Material-UI to define a custom theme for the app.
import { createTheme } from '@mui/material/styles';

// Import the Roboto font in various weights. These styles will be applied globally to components that use Material-UI typography.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Define a set of reusable color constants to maintain consistency across the app's styles.
const COLORS = {
  WHITE: '#fafaf9', // A slightly off-white color used for backgrounds or light themes.
  PURE_WHITE: '#ffffff', // Pure white, often used for contrasts or highlights.
  BLACK: '#0c0a09', // Deep black for text or borders.
  ORANGE: '#d97706', // A vibrant orange color used for accents or highlights.
};

// Define custom styles specifically for graph-related elements, such as nodes and handles.
// This is useful for consistent styling of graph elements in the app.
const graphStyles = {
  node: {
    container: {
      padding: '10px 20px', // Adds spacing inside the node.
      borderRadius: '3px', // Rounds the edges of the node.
      border: `1px solid ${COLORS.BLACK}`, // Adds a black border around the node.
      background: COLORS.PURE_WHITE, // Sets the background color of the node to pure white.
      minWidth: '150px', // Ensures a minimum width for the node.
    },
    handle: {
      width: '12px', // Width of the handle, a small circular element in the node.
      height: '12px', // Height of the handle.
      background: COLORS.WHITE, // Sets the handle's color to black.
      borderRadius: '15%', // Makes the handle circular.
      border: `2px solid ${COLORS.BLACK}`, // Adds a white border around the handle.
    },
    label: {
      textAlign: 'center', // Centers the label text inside the node.
      fontFamily: 'Roboto', // Uses the Roboto font for consistency with Material-UI's typography.
      color: COLORS.BLACK, // Sets the text color to black for good contrast.
    },
  },
};

// Create a custom Material-UI theme with `createTheme` to define global styles for the app.
const theme = createTheme({
  // Define a color palette for the theme.
  palette: {
    primary: {
      main: COLORS.WHITE, // Sets the primary color to white for the main UI elements.
    },
    secondary: {
      main: COLORS.BLACK, // Sets the secondary color to black for accents.
    },
    accent: {
      main: COLORS.ORANGE, // Adds a custom accent color (not built-in) for special use cases.
    },
    background: {
      default: COLORS.PURE_WHITE, // Sets the default background color for pages.
      paper: COLORS.WHITE, // Sets the background color for elements like cards.
    },
  },
  // Define typography settings, including the font family used throughout the app.
  typography: {
    fontFamily: [
      'Roboto', // Primary font for the app.
      '-apple-system', // Fallback font for Apple devices.
      'BlinkMacSystemFont', // Fallback font for older Apple systems.
      '"Segoe UI"', // Fallback font for Windows systems.
      'Arial', // Fallback for general compatibility.
      'sans-serif', // Generic fallback for browsers without specific fonts.
    ].join(','), // Joins the fonts into a single string.
  },
  // Customize Material-UI components by overriding their default styles.
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevents buttons from having all-uppercase text.
          fontSize: '1.2rem', // Increases the button font size slightly.
          '&:hover': {
            backgroundColor: COLORS.ORANGE, // Changes the background color on hover to the accent orange.
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: COLORS.ORANGE, // Adds the orange accent color when an icon button is hovered over.
          },
        },
      },
    },
  },
  // Include the graph styles as part of the custom theme.
  // This allows the graph-specific styles to be accessed via the theme.
  graph: graphStyles,
});

// Export the custom theme so it can be imported and used throughout the app.
export default theme;
