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
    description: 'Visualize requirement relationships and dependencies in an interactive graph',
  },
  {
    icon: <TableChart fontSize="large" sx={{ color: 'secondary.main' }} />,
    heading: 'Table View',
    description: 'Manage requirements in a familiar spreadsheet-like interface',
  },
  {
    icon: <Description fontSize="large" sx={{ color: 'secondary.main' }} />,
    heading: 'Document View',
    description: 'Work with requirements in traditional document format',
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
            heading="Modern Requirements Management"
            subheading="Clarify helps engineering teams track, organize and visualize complex requirements"
          />
          <Box sx={{ textAlign: 'center' }}>
            <MainButton onClick={() => navigate('/demo')}>Try Demo</MainButton>
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
