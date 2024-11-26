import { Toolbar, Container, Box } from '@mui/material';
import { AccountTree, TableChart, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import IconCard from '../components/ui/cards/IconCard';
import HeroSection from '../components/ui/sections/HeroSection';
import MainButton from '../components/ui/buttons/MainButton';

const features = [
  {
    icon: <AccountTree fontSize="large" sx={{ color: 'secondary.main' }} />,
    heading: 'Graph View',
    description:
      'Discover hidden connections and dependencies between document elements in an interactive model',
  },
  {
    icon: <TableChart fontSize="large" sx={{ color: 'secondary.main' }} />,
    heading: 'Table View',
    description: 'Analyze and manipulate document data with powerful table-based tools',
  },
  {
    icon: <Description fontSize="large" sx={{ color: 'secondary.main' }} />,
    heading: 'Document View',
    description:
      'Generate traditional document formats while maintaining the benefits of model-based data',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <HeroSection
            heading="Model-Based Document Engineering"
            subheading="Clarify transforms traditional engineering documents into intelligent, connected models - making them easier to visualize, manage, and understand"
          />
          <Box sx={{ textAlign: 'center' }}>
            <MainButton onClick={() => navigate('/graph')}>Try Demo</MainButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {features.map((feature, index) => (
            <IconCard
              key={index}
              icon={feature.icon}
              heading={feature.heading}
              description={feature.description}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
