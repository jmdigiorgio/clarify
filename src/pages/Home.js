// Import necessary components and hooks from Material-UI and React Router
import { Toolbar, Container, Box } from '@mui/material';
// `Toolbar` is a spacer to align content below an AppBar.
// `Container` provides a responsive layout container with consistent margins.
// `Box` is a flexible utility component for styling and layout.

import { AccountTree, TableChart, Description } from '@mui/icons-material';
// Import icons from Material-UI's icon library to visually represent features.

import { useNavigate } from 'react-router-dom';
// `useNavigate` is a React Router hook for programmatically navigating to different routes.

import IconCard from '../components/ui/cards/IconCard';
// A custom reusable component that displays an icon, heading, and description (likely styled as a card).

import HeroSection from '../components/ui/sections/HeroSection';
// A custom reusable component for displaying a prominent heading and subheading, typically used as a page's introduction.

import MainButton from '../components/ui/buttons/MainButton';
// A custom reusable button component with consistent styles.

// Define an array of feature objects. Each object contains an icon, heading, and description for the feature.
const features = [
  {
    icon: <AccountTree fontSize="large" sx={{ color: 'secondary.main' }} />,
    // `AccountTree` is an icon representing the Graph View feature.
    // `fontSize="large"` makes the icon larger, and `sx` allows for inline styling.
    heading: 'Graph View',
    description:
      'Discover hidden connections and dependencies between document elements in an interactive model',
    // A brief explanation of the feature.
  },
  {
    icon: <TableChart fontSize="large" sx={{ color: 'secondary.main' }} />,
    // `TableChart` icon for the Table View feature.
    heading: 'Table View',
    description: 'Analyze and manipulate document data with powerful table-based tools',
  },
  {
    icon: <Description fontSize="large" sx={{ color: 'secondary.main' }} />,
    // `Description` icon for the Document View feature.
    heading: 'Document View',
    description:
      'Generate traditional document formats while maintaining the benefits of model-based data',
  },
];

// Define the `Home` component, which serves as the main landing page for the app.
export default function Home() {
  const navigate = useNavigate();
  // `useNavigate` hook is used to navigate programmatically between pages.

  return (
    <>
      <Toolbar />
      {/* Add a `Toolbar` as a spacer to push content below a fixed AppBar. */}

      <Container maxWidth="lg">
        {/* `Container` centers and constrains the content's width to a large (`lg`) breakpoint. */}
        <Box sx={{ mb: 6 }}>
          {/* `Box` with bottom margin (`mb: 6`) to space out the sections. */}

          {/* Render the HeroSection with a heading and subheading describing the app's purpose. */}
          <HeroSection
            heading="Model-Based Document Engineering"
            subheading="Clarify transforms traditional engineering documents into intelligent, connected models - making them easier to visualize, manage, and understand"
          />

          {/* Add a button centered below the hero section that navigates to the Graph View page. */}
          <Box sx={{ textAlign: 'center' }}>
            <MainButton onClick={() => navigate('/graph')}>Try Demo</MainButton>
            {/* `onClick` navigates to the "/graph" route when the button is clicked. */}
          </Box>
        </Box>

        {/* Render a row of feature cards with icons, headings, and descriptions. */}
        <Box
          sx={{
            display: 'flex', // Use flexbox for layout.
            gap: 4, // Add spacing between the cards.
            flexDirection: 'row', // Arrange cards in a row.
            justifyContent: 'space-between', // Distribute space evenly between cards.
          }}
        >
          {/* Map over the `features` array to dynamically create `IconCard` components for each feature. */}
          {features.map((feature, index) => (
            <IconCard
              key={index} // Use `index` as the unique key for each card (acceptable here because the array won't change).
              icon={feature.icon} // Pass the icon as a prop to the `IconCard` component.
              heading={feature.heading} // Pass the heading as a prop.
              description={feature.description} // Pass the description as a prop.
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
