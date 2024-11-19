import { Typography, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

export default function ProjectTree({ onSelect }) {
  return (
    <Box sx={{ width: 300, p: 2, height: '100%', backgroundColor: '#fafaf9' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#0c0a09' }}>
        Project Tree
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#0c0a09' }}>
        Projects can be nested within projects to delegate work to specialized teams and simplify complex systems.
      </Typography>
      <SimpleTreeView
        aria-label="project hierarchy"
        defaultExpandIcon={<ChevronRight />}
        defaultCollapseIcon={<ExpandMore />}
        defaultExpanded={['1']}
        onClick={(event) => {
          // Get the clicked label
          const label = event.target.closest('.MuiTreeItem-label')?.textContent;
          if (label) {
            onSelect(label);
          }
        }}
      >
        <TreeItem itemId="1" label="Aircraft System">
          <TreeItem itemId="2" label="Avionics">
            <TreeItem itemId="3" label="Flight Control" />
            <TreeItem itemId="4" label="Navigation" />
          </TreeItem>
          <TreeItem itemId="5" label="Propulsion">
            <TreeItem itemId="6" label="Engine Control" />
            <TreeItem itemId="7" label="Fuel System" />
          </TreeItem>
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}