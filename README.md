----------Cricket Scorecard Web Application------------


A real-time cricket scorecard web application built with React and Socket.IO. This project allows users to view and update cricket match scores, player statistics, and commentary dynamically during a match.

------Features-----


Real-time Score Updates: Score updates for runs, wickets, and overs are streamed live to all connected clients using Socket.IO.
Player Statistics: Tracks individual player performance for batsmen and bowlers, including runs, balls faced, boundaries, overs bowled, maidens, runs conceded, and wickets taken.
Commentary: Displays real-time match commentary.
Simple and Responsive UI: Designed with a clean, user-friendly interface for an optimal viewing experience across devices.
Technologies Used
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Real-time Communication: Socket.IO
Prerequisites
Ensure you have the following installed:

Node.js (v14 or above)
npm (v6 or above)
Installation
Clone the repository:

---NAVIGATE INTO SERVER FOLDER---


npm install


Then Start The Server using "npm start"



---NAVIGATE INTO ASSIGNMENT FOLDER---


npm install


Then Start The Client Side using "npm run dev"


--USE THESE VALUES FOR .ENV FILE


MONGO_URL="YOUR MONGODB URL"


TOKEN_SECRET=secret


DOMAIN=http://localhost:3000

