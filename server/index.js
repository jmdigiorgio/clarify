const express = require('express');
const cors = require('cors');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const app = express();

// CORS configuration
// This explicitly allows requests from our Vercel frontend and local development
// While blocking requests from unauthorized origins for security
app.use(
  cors({
    origin: ['https://clarify-rm.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed request headers
    credentials: true, // Allows cookies and authentication headers
  })
);

// Parse JSON payloads in requests
app.use(express.json());

// Initialize Neo4j driver with environment variables
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Test route to verify Neo4j connection
app.get('/api/test', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('RETURN "Connection successful!" as message');
    res.json({
      success: true,
      message: result.records[0].get('message'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  } finally {
    await session.close();
  }
});

// Import route modules
const graphRoutes = require('./routes/graph');

// Mount routes
app.use('/api/graph', graphRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cleanup Neo4j connection on server shutdown
process.on('SIGTERM', async () => {
  await driver.close();
  process.exit(0);
});
