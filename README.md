# Text Editor with Real-Time Collaboration

This project is a Text Editor application built using the MERN stack (MongoDB, Express.js, React, Node.js) with real-time collaboration features using Socket.io. The state management is handled with Redux.

## Features

- Real-time collaboration: Multiple users can edit the document simultaneously.
- Persistent storage: Documents are stored in MongoDB for future access.
- User authentication: Secure user authentication with JWT tokens.
- Redux for state management: Centralized state management using Redux.
- Responsive design: User-friendly interface accessible on various devices.

## Technologies Used

- MongoDB: Database for storing documents.
- Express.js: Backend server framework.
- React: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side development.
- Socket.io: Real-time web socket communication.
- Redux: State management library.
- JWT: JSON Web Tokens for user authentication.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB server running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aman1205/Text_editor.git
   
2.Setup
  Environment Variable
    - MONGO_URI=your_mongodb_uri
    -SECRET_KEY=your_secret_key
    -Port= 
3.Running 
  1. cd client 
      - npm install 
      - npm run dev
      - localhost:5173
  2. cd server
        - npm install
        - npm run dev
     
   
