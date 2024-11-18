# Design Specification for Clarify App Proof of Concept

## Business Problem

Requirements management for complex systems engineering usually originates with human-readable, document-based artifacts (requirements specs) prepared by the customer, delivered to the contractor, and expanded by the contractor for the purpose of successfully engineering a system that solves a set of problems. Requirements define what a system must do to solve a set of problems. Requirements specs can be hundreds or thousands of pages long. Because they are written by humans for humans, they often contain superfluous, redundant, and contradictory natural language. The essence of their meaning is left to the interpretation of the reader. Because requirements specs are often so complex, it is extremely arduous and costly for a team of engineers and business personnel to effectively manage them. Emergent interdependencies between requirements are easily missed. Tracing requirements is a manual effort. In short, the time has come to explore better ways of managing these documents.

## Overview

Clarify is a modern requirements management app designed for complex systems engineering. It aims to solve industry challenges around requirements tracking, organization, and visualization. The app will feature three primary interaction views: Graph, Table, and Document. Each view will offer unique ways to engage with requirements, whether users need a visual representation, a structured list, or detailed textual documentation. The target users are technical and business people who all need to manage and engage with the same set of requirements but in very different ways.

## Key Features

- Graph View: A visual, graph-based representation of requirements and their interrelationships, leveraging a Neo4j database.
- Table View: A structured list format of requirements, similar to a traditional spreadsheet.
- Document View: A formalized rich-text representation of the same requirement data found in the graph and table views.
- CRUD capabilities will be available in all views.
- Seamless, on-demand view switching.
- Commenting and collaboration will be available in all views.
- Detailed git-style versioning across all data regardless of view.
- RBAC
- Restricted Mode: The ability to sync between instances of requirements specs across tiered environments that cannot share some data.
- Organization by project and project nesting for compartmentalizing and delegating work.
- Integration with Jira and Confluence for work tasking.

## Architecture

- Frontend: React with MUI
  - App Pages are located in src/pages
- Backend:Neo4j is used for storing requirements data, focusing on representing relationships effectively. A custom API facilitates interaction between the frontend and Neo4j database.
- Deployment and CICD: Vercel, providing scalability and ease of deployment for the frontend.

## User Workflow

1. Splash Page: Users are given the big picture of what Clarify is. They can access a demo button on the header.
2. Demo: The user is given a choice of the 3 views: Graph, Table, Document.
3. View Selection: Once a user selects a view, they are taken to the relevant interface, which offers the ability to toggle between views without losing context.
4. Each view allows CRUD operations for requirements data as well as collaboration between users on the data.

## Future Capabilities

Analytics Module: Provide data insights on requirement stability, traceability matrix, and dependency risk analysis.
