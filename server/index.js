const express = require('express');
const cors = require('cors');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Neo4j driver
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
      message: result.records[0].get('message')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    await session.close();
  }
});

// Import routes
const graphRoutes = require('./routes/graph');

// Use routes
app.use('/api/graph', graphRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cleanup on server shutdown
process.on('SIGTERM', async () => {
  await driver.close();
  process.exit(0);
});