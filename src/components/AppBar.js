// Import necessary components from MUI (Material UI) library.
// - AppBar: Provides a top-level application bar for branding, navigation, or actions.
// - Toolbar: Used to contain content like title, buttons, or icons within the AppBar.
// - Button: A component for creating clickable buttons.
// - ThemeProvider, createTheme: Used for creating and applying a custom theme.
// - IconButton: A component for clickable icons, often used for menus.
// - MenuIcon: The icon for a typical menu button (hamburger menu).
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css'; // Import Roboto font weight 300 (Light)
import '@fontsource/roboto/400.css'; // Import Roboto font weight 400 (Regular)
import '@fontsource/roboto/500.css'; // Import Roboto font weight 500 (Medium)
import '@fontsource/roboto/700.css'; // Import Roboto font weight 700 (Bold)

// Create a custom theme using createTheme function.
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fafaf9', // White color for primary elements (e.g., button text)
    },
    secondary: {
      main: '#0c0a09', // Black color for secondary elements (e.g., AppBar background)
    },
    accent: {
      main: '#d97706', // Orange color for accent elements (e.g., hover effect)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Set Roboto as the default font for a modern tech look
    fontSize: 16, // Set the base font size for the entire application (default is 16px)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Ensure button text follows the case of its label (no uppercase transformation).
          fontSize: '1.2rem', // Increase the font size of the button text
          '&:hover': {
            backgroundColor: '#d97706', // Change background color to accent color (orange) on hover.
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#d97706', // Change background color to accent color (orange) on hover for IconButton as well.
          },
        },
      },
    },
  },
});

// Define a functional component called 'CustomAppBar'.
// This component will create an AppBar with a Toolbar, a button, and an icon button.
export default function CustomAppBar() {
  return (
    // Wrap the AppBar with ThemeProvider to apply the custom theme.
    <ThemeProvider theme={customTheme}>
      {/* The AppBar component acts as the application bar. It is a common element for navigation and branding.
          'position="fixed"' means that the AppBar will remain fixed at the top of the page, even when the user scrolls.
          'color="secondary"' sets the AppBar's color to the custom secondary color (black) from the theme. */}
      <AppBar position="fixed" color="secondary">
        {/* Toolbar is used to add padding and align items within the AppBar. */}
        <Toolbar>
          {/* Button component is used to create a clickable button.
              - 'sx' is used to customize the color of the button text to the primary color (white) from the theme.
              - This button can be used for navigation or branding purposes. */}
          <Button sx={{ color: 'primary.main' }} href="/">Clarity</Button>
          {/* IconButton component is used to create a button with just an icon.
              - 'edge="end"' is used to align the icon button to the end of its container.
              - The MenuIcon is used to provide a typical hamburger menu icon.
              - The hover effect is now added to the IconButton as well. */}
          <IconButton edge="end" sx={{ color: 'primary.main' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
