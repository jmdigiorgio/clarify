// Import necessary components for the tree view
import { Typography, Box } from '@mui/material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

// Mock project hierarchy items - could be moved to a separate data file later
const items = [
  {
    id: 'aircraft-system',
    label: 'Aircraft System',
    children: [
      {
        id: 'avionics',
        label: 'Avionics',
        children: [
          { id: 'flight-control', label: 'Flight Control' },
          { id: 'navigation', label: 'Navigation' }
        ],
      },
      {
        id: 'propulsion',
        label: 'Propulsion',
        children: [
          { id: 'engine-control', label: 'Engine Control' },
          { id: 'fuel-system', label: 'Fuel System' }
        ],
      },
    ],
  },
];

export default function ProjectTree({ onSelect }) {
  // Handler for when a node is selected in the tree
  const handleNodeSelect = (event, nodeId) => {
    // Find the selected project label in items
    const findLabel = (items) => {
      for (const item of items) {
        if (item.id === nodeId) return item.label;
        if (item.children) {
          const found = findLabel(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const projectName = findLabel(items);
    if (projectName) {
      onSelect(projectName);
    }
  };

  return (
    <Box sx={{ 
      width: 300, 
      p: 2,
      height: '100%',
      backgroundColor: '#fafaf9'
    }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#0c0a09' }}>
        Project Hierarchy
      </Typography>
      
      <TreeView
        aria-label="project hierarchy"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        defaultExpanded={['aircraft-system']}
        onNodeSelect={handleNodeSelect}
        sx={{
          '& .MuiTreeItem-root': {
            '& .Mui-selected': {
              backgroundColor: '#d97706 !important',
              color: 'white',
            },
          },
        }}
      >
        {items.map((item) => (
          <TreeItem 
            key={item.id}
            nodeId={item.id}
            label={item.label}
          >
            {item.children?.map((child) => (
              <TreeItem
                key={child.id}
                nodeId={child.id}
                label={child.label}
              >
                {child.children?.map((grandChild) => (
                  <TreeItem
                    key={grandChild.id}
                    nodeId={grandChild.id}
                    label={grandChild.label}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
}