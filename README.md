# Multiplayer Space Odyssey

This is a real-time multiplayer space game built using **PlayCanvas** and **Colyseus**. Two players control avatars in a shared 3D space environment, with real-time movement synchronization between players.

## Features
- Real-time multiplayer using Colyseus
- Synchronization of two avatars
- Basic movement system using keyboard input
- Interactive space environment with teleportation

## How to Run

### Client (PlayCanvas)
The client is built using PlayCanvas. You can run it in the browser by hosting the PlayCanvas project.

### Server (Node.js + Colyseus)
To run the Colyseus multiplayer server:
1. Clone the repository
2. Navigate to the `server/` directory and install the dependencies:
   ```bash
   cd server
   npm install
