import { 
  Toolbar,      // MUI app bar spacing component 
  Container,    // Centers content with max-width
  Typography,   // MUI text component with predefined styles
  Paper,        // Elevated surface component
  Box,          // Flexible div wrapper with sx prop support
  Button,       // MUI button component
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';  // Import theme components
import { AccountTree, TableChart, Description } from '@mui/icons-material'; // Icon components
import { useNavigate } from 'react-router-dom';  // Import for navigation

// Create custom theme that matches AppBar.js for consistency across components
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fafaf9', // White color for primary elements
    },
    secondary: {
      main: '#0c0a09', // Black color for secondary elements
    },
    accent: {
      main: '#d97706', // Orange color for accent/hover effects
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent automatic uppercase transformation
          fontSize: '1.2rem',    // Larger font size for better visibility
          '&:hover': {
            backgroundColor: '#d97706', // Orange hover effect matching AppBar
          },
        },
      },
    },
  },
});

export default function Home() {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // Data structure for the three main feature cards
  const features = [
    {
      icon: <AccountTree fontSize="large" />,
      title: "Graph View",
      description: "Visualize requirement relationships and dependencies in an interactive graph"
    },
    {
      icon: <TableChart fontSize="large" />,
      title: "Table View",
      description: "Manage requirements in a familiar spreadsheet-like interface"
    },
    {
      icon: <Description fontSize="large" />,
      title: "Document View", 
      description: "Work with requirements in traditional document format"
    }
  ];

  return (
    <ThemeProvider theme={customTheme}>  {/* Apply custom theme to all MUI components */}
      <Toolbar /> {/* Provides spacing below the app bar */}
      <Container maxWidth="lg"> {/* Centers content with large max-width */}
        {/* Hero section with main heading, subtext, and CTA button */}
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 12, // Large margin bottom for separation from cards
            mt: 8   // Balances top spacing
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Modern Requirements Management
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6 }} // Adds space before the button
          >
            Clarify helps engineering teams track, organize and visualize complex requirements
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
            onClick={() => navigate('/demo')}  // Add navigation on click
          >
            Try Demo
          </Button>
        </Box>

        {/* Feature cards section using flexbox for equal width distribution */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 4,                    // Equal spacing between cards
            flexDirection: 'row',      // Cards in a horizontal line
            justifyContent: 'space-between' // Spreads cards evenly
          }}
        >
          {features.map((feature, index) => (
            <Paper 
              key={index}
              sx={{
                p: 3,             // Internal padding
                flex: 1,          // Each card takes equal width
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',  // Centers content horizontally
                textAlign: 'center'
              }}
              elevation={2}       // Subtle shadow effect
            >
              {feature.icon}
              <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}