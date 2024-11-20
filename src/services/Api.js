// Base API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
};

// Graph-related API calls
export const graphApi = {
    // Get all nodes
    getNodes: () => apiRequest('/graph/nodes'),
    
    // Create a new node
    createNode: (labels, properties) => apiRequest('/graph/nodes', {
        method: 'POST',
        body: JSON.stringify({ labels, properties })
    }),
    
    // Delete a node
    deleteNode: (id) => apiRequest(`/graph/nodes/${id}`, {
        method: 'DELETE'
    })
};

export default {
    graph: graphApi
};