const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver');

// Get driver instance from environment
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Get all nodes
router.get('/nodes', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (n) RETURN n');
        const nodes = result.records.map(record => {
            const node = record.get('n');
            return {
                id: node.identity.toString(),
                labels: node.labels,
                properties: node.properties
            };
        });
        res.json(nodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
});

// Create a node
router.post('/nodes', async (req, res) => {
    const { labels, properties } = req.body;
    if (!labels || !Array.isArray(labels) || labels.length === 0) {
        return res.status(400).json({ error: 'Labels array required' });
    }

    const session = driver.session();
    try {
        // Convert labels array to Neo4j label string
        const labelString = labels.map(l => `${l}`).join(':');
        const result = await session.run(
            `CREATE (n:${labelString} $properties) RETURN n`,
            { properties: properties || {} }
        );
        const node = result.records[0].get('n');
        res.status(201).json({
            id: node.identity.toString(),
            labels: node.labels,
            properties: node.properties
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
});

// Delete a node
router.delete('/nodes/:id', async (req, res) => {
    const session = driver.session();
    try {
        await session.run(
            'MATCH (n) WHERE ID(n) = $id DELETE n',
            { id: neo4j.int(req.params.id) }
        );
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
});

module.exports = router;