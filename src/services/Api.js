// Base API configuration
const API_BASE_URL = 'https://clarify-x70d.onrender.com/api';

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
const graphApi = {
  // Node operations
  getNodes: () => apiRequest('/graph/nodes'),
  createNode: (labels, properties) =>
    apiRequest('/graph/nodes', {
      method: 'POST',
      body: JSON.stringify({ labels, properties }),
    }),
  deleteNode: (id) =>
    apiRequest(`/graph/nodes/${id}`, {
      method: 'DELETE',
    }),

  // Node Type operations
  getNodeTypes: () => apiRequest('/graph/node-types'),
  createNodeType: (typeData) =>
    apiRequest('/graph/node-types', {
      method: 'POST',
      body: JSON.stringify(typeData),
    }),
  updateNodeType: (id, typeData) =>
    apiRequest(`/graph/node-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(typeData),
    }),
  deleteNodeType: (id) =>
    apiRequest(`/graph/node-types/${id}`, {
      method: 'DELETE',
    }),
};

// Consolidated API service
const apiService = { graph: graphApi };

export { apiService as default };
