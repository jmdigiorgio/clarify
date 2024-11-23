const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver');

// Get driver instance from environment
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Node operations
router.get('/nodes', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n) RETURN n');
    const nodes = result.records.map((record) => {
      const node = record.get('n');
      return {
        id: node.identity.toString(),
        labels: node.labels,
        properties: node.properties,
      };
    });
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

router.post('/nodes', async (req, res) => {
  const { labels, properties } = req.body;
  if (!labels || !Array.isArray(labels) || labels.length === 0) {
    return res.status(400).json({ error: 'Labels array required' });
  }

  const session = driver.session();
  try {
    const labelString = labels.map((l) => `${l}`).join(':');
    const result = await session.run(`CREATE (n:${labelString} $properties) RETURN n`, {
      properties: properties || {},
    });
    const node = result.records[0].get('n');
    res.status(201).json({
      id: node.identity.toString(),
      labels: node.labels,
      properties: node.properties,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

router.delete('/nodes/:id', async (req, res) => {
  const session = driver.session();
  try {
    await session.run('MATCH (n) WHERE ID(n) = $id DELETE n', { id: neo4j.int(req.params.id) });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

// Node Type operations
router.get('/node-types', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n:NodeType) RETURN n ORDER BY n.name');
    const types = result.records.map((record) => {
      const node = record.get('n');
      return {
        id: node.identity.toString(),
        name: node.properties.name,
        schema: node.properties.schema,
      };
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

router.post('/node-types', async (req, res) => {
  const { name, schema } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name required' });
  }

  const session = driver.session();
  try {
    // Check if name is unique
    const existing = await session.run('MATCH (n:NodeType {name: $name}) RETURN n', { name });
    if (existing.records.length > 0) {
      return res.status(409).json({ error: 'Node type name must be unique' });
    }

    const result = await session.run(
      'CREATE (n:NodeType {name: $name, schema: $schema}) RETURN n',
      { name, schema: schema || [] }
    );
    const node = result.records[0].get('n');
    res.status(201).json({
      id: node.identity.toString(),
      name: node.properties.name,
      schema: node.properties.schema,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

router.put('/node-types/:id', async (req, res) => {
  const { name, schema } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name required' });
  }

  const session = driver.session();
  try {
    // Check if name is unique (excluding current node)
    const existing = await session.run(
      'MATCH (n:NodeType {name: $name}) WHERE ID(n) <> $id RETURN n',
      { name, id: neo4j.int(req.params.id) }
    );
    if (existing.records.length > 0) {
      return res.status(409).json({ error: 'Node type name must be unique' });
    }

    const result = await session.run(
      'MATCH (n:NodeType) WHERE ID(n) = $id SET n.name = $name, n.schema = $schema RETURN n',
      {
        id: neo4j.int(req.params.id),
        name,
        schema: schema || [],
      }
    );
    const node = result.records[0].get('n');
    res.json({
      id: node.identity.toString(),
      name: node.properties.name,
      schema: node.properties.schema,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

router.delete('/node-types/:id', async (req, res) => {
  const session = driver.session();
  try {
    await session.run('MATCH (n:NodeType) WHERE ID(n) = $id DELETE n', {
      id: neo4j.int(req.params.id),
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

module.exports = router;
