// copyToClaudeFolder.js
const fs = require('fs');
const path = require('path');

// List of files to copy - add new files here as needed
const filesToCopy = [
    { src: 'src/App.js', dest: 'claude/App.js' },
    { src: 'src/components/AppBar.js', dest: 'claude/AppBar.js' },
    { src: 'src/components/ProjectTree.js', dest: 'claude/ProjectTree.js' },
    { src: 'src/components/GraphViewport.js', dest: 'claude/GraphViewport.js' }, // New
    { src: 'src/components/RequirementNode.js', dest: 'claude/RequirementNode.js' }, // New
    { src: 'src/pages/Demo.js', dest: 'claude/Demo.js' },
    { src: 'src/pages/Home.js', dest: 'claude/Home.js' },
    { src: 'src/services/Api.js', dest: 'claude/Api.js' },
    { src: 'server/index.js', dest: 'claude/index.js' },
    { src: 'server/routes/graph.js', dest: 'claude/graph.js' },
    { src: 'package.json', dest: 'claude/package.json' },
    { src: 'docs/concept.md', dest: 'claude/concept.md' }
];

// Create claude directory if it doesn't exist
if (!fs.existsSync('claude')) {
    fs.mkdirSync('claude');
}

// Copy each file
filesToCopy.forEach(file => {
    try {
        // Create any necessary subdirectories
        const destDir = path.dirname(file.dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        // Copy the file
        fs.copyFileSync(file.src, file.dest);
        console.log(`Copied ${file.src} to ${file.dest}`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Source file not found: ${file.src}`);
        } else {
            console.error(`Error copying ${file.src}:`, error);
        }
    }
});