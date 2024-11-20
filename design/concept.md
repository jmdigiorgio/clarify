# Design Specification for Clarify App Proof of Concept

## Business Problem

Requirements management for complex systems engineering usually originates with human-readable, document-based artifacts (requirements specs) prepared by the customer, delivered to the contractor, and expanded by the contractor for the purpose of successfully engineering a system that solves a set of problems. Requirements define what a system must do to solve a set of problems. Requirements specs can be hundreds or thousands of pages long. Because they are written by humans for humans, they often contain superfluous, redundant, and contradictory natural language. The essence of their meaning is left to the interpretation of the reader. Because requirements specs are often so complex, it is extremely arduous and costly for a team of engineers and business personnel to effectively manage them. Emergent interdependencies between requirements are easily missed. Tracing requirements is a manual effort. In short, the time has come to explore better ways of managing these documents.

## App Overview

Clarify is a modern requirements management app designed for complex systems engineering. It aims to solve industry challenges around requirements tracking, organization, and visualization. The app will feature three primary interaction views: Graph, Table, and Document. Each view will offer unique ways to engage with requirements, whether users need a visual representation, a structured list, or detailed textual documentation. The target users are technical and business people who all need to manage and engage with the same set of requirements but in very different ways.

## Key Features

- Graph View: A visual, graph-based representation of requirements and their interrelationships, leveraging a Neo4j database.
- Table View: A structured list format of requirements, similar to a traditional spreadsheet.
- Document View: A formalized rich-text representation of the same requirement data found in the graph and table views.
- CRUD capabilities available in all views.
- Seamless, on-demand view switching.
- Commenting and collaboration will be available in all views.
- Detailed git-style versioning across all data regardless of view.
- RBAC
- Restricted Mode: The ability to sync between instances of requirements specs across separate environments that cannot share some data.
- Requirements organization by project and project nesting for compartmentalizing complex systems and delegating work.
- A robust API that allows Clarify to be integrated with other enterprise tools.

## High-level Architecture

- Frontend: Vanilla React (NOT nextjs) with MUI
- Backend: Express server running as middleware between frontend and Neo4j
- Database: Neo4j hosted on Aura, used for storing requirements data and relationships
- API Structure:
  - Express server handles all database operations
  - Frontend services layer abstracts API calls
  - Environment variables stored securely
- Deployment and CICD: Vercel, providing scalability and ease of deployment for the frontend

## App Physical Architecture

Pages call components depending on context.

- src/pages
  - Home.js - Splash page for the app
  - Demo.js - Demo of the app, now includes working Graph view with node creation and retrieval
- src/components
  - AppBar.js - This component is the header menu, buttons vary based on the page being rendered
  - ProjectTree.js - This component is intended to organize the hierarchy of projects which are the containers for requirements
- src/services
  - Api.js - Frontend service layer for making API calls to the Express backend
- server/
  - index.js - Express server setup and main configuration
  - routes/
    - graph.js - API endpoints for graph operations (currently supports node CRUD operations)

## Current Implementation Status

- Backend:
  - Express server implemented with Neo4j connection
  - Basic CRUD operations for nodes established
  - Environment variables properly secured
  
- Frontend:
  - Api service layer implemented
  - Demo page updated with Graph view
  - Node creation and retrieval working
  - Basic UI for displaying nodes using MUI Cards
  - ESLint and Prettier configured for code quality and consistent formatting

## Development Practices

- Code Quality:
  - ESLint configured with React-app and Prettier extensions
  - Custom rules established for console usage and export patterns
  - Automated formatting with Prettier
  - Version control ignoring sensitive files (.env)

## User Workflow

1. Splash Page: Users are given the big picture of what Clarify is. They can access a demo button on the header.
2. Demo: The user is given a choice of the 3 views: Graph, Table, Document.
3. View Selection: Once a user selects a view, they are taken to the relevant interface, which offers the ability to toggle between views without losing context.
4. Graph View: Users can create new requirement nodes and view existing ones.
5. Each view allows CRUD operations for requirements data as well as collaboration between users on the data.

## Next Steps

- Implement proper logging system to replace console.log statements
- Clean up existing code to meet new linting standards
- Implement node deletion
- Add custom fields for node creation
- Implement relationship creation and management
- Develop proper graph visualization
- Begin work on Table and Document views
