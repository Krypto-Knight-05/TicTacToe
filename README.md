# Tic-Tac-Toe Multiplayer 🎮

A full-stack real-time multiplayer Tic-Tac-Toe game built with React, Node.js, and Socket.io – playable instantly on web, desktop, or mobile!

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://tic-tac-toe-nu-three-18.vercel.app/]
- **Backend (Render):** [https://tictactoe-mzaw.onrender.com]
- **Repository:** [https://github.com/Krypto-Knight-05/TicTacToe]

---

## 🖥️ Features

- ✨ Real-time gameplay between two players using Socket.io WebSockets
- 🎮 Room-based structure: Create/join game sessions with a code
- 📱 Responsive UI for smooth play across mobile and desktop screens
- 🔄 Redux-powered state management
- ⚡ Instant updates and turn synchronization
- 🚀 Deployed with CI/CD (Vercel frontend & Render backend)
- 💾 Ready for persistent storage integration (MongoDB Atlas supported)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Redux** - State management
- **Socket.io Client** - Real-time communication
- **CSS3** - Styling with mobile responsiveness

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - WebSocket library for real-time events
- **CORS** - Cross-origin request handling

### Deployment
- **Vercel** - Frontend hosting (auto CI/CD)
- **Render** - Backend hosting (auto CI/CD)

---

## 📦 Project Structure

```
TicTacToe-Multiplayer/
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── Create.jsx              # Room creation logic
│   │   ├── Join.jsx                # Join room component
│   │   ├── Game.jsx                # Game board & turn management
│   │   ├── TicTacToe.jsx           # Game logic & grid rendering
│   │   ├── redux/
│   │   │   ├── Slice.jsx           # Redux slice
│   │   │   └── Store.jsx           # Redux store config
│   │   ├── App.css                 # App styles
│   │   ├── Pages.css               # Page styles
│   │   ├── TicTacToe.css           # Game styles
│   │   ├── index.css               # Global styles
│   │   ├── main.jsx                # Entry point
│   │   └── index.html              # HTML template
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── Backend/
│   ├── app.js                      # Express server & Socket.io setup
│   ├── GameLogic.js                # Game logic functions
│   ├── model/
│   │   └── Player.js               # Player model
│   ├── package.json
│   └── .gitignore
│
├── .gitignore                      # Global gitignore
└── README.md                       # This file
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Krypto-Knight-05/TicTacToe.git
cd tictactoe-multiplayer
```

2. **Backend Setup**

```bash
cd Backend
npm install
node app.js
```

Backend runs on `http://localhost:4444`

3. **Frontend Setup** (new terminal)

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🎮 How to Play

### Create a Room
1. Open the game in your browser
2. Click **"Create Room"** button
3. Share the generated room code with your friend

### Join a Room
1. Open the game link
2. Click **"Join Room"** button
3. Enter the room code
4. Wait for the opponent to join

### Play
1. Player X goes first
2. Click any empty cell to place your mark
3. First player to get 3 in a row (horizontally, vertically, or diagonally) wins!
4. Play again or create a new room

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Automatic deployment on every push to `master` branch

### Backend Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set root directory: `Backend`
4. Set build command: `npm install`
5. Set start command: `node app.js`
6. Automatic deployment on every push to `master` branch

### Environment Variables

**Backend (Render):**
- `PORT` (automatically set by Render)

**Frontend (Vercel):**
- `VITE_SOCKET_URL` (Socket.io server URL)

---

## 📱 Mobile Support

The game is fully responsive and works seamlessly on:
- 📱 Smartphones (iOS & Android)
- 💻 Tablets
- 🖥️ Desktop browsers

Media queries ensure optimal layout and touch-friendly interactions.

---

## 🔌 Socket.io Events

### Client → Server
- `join_room` - Player joins a room
- `make_move` - Player makes a game move
- `reset_game` - Reset the game board

### Server → Client
- `game_state` - Updated game state
- `player_turn` - Notify whose turn it is
- `game_over` - Announce winner or draw
- `player_joined` - Notify when opponent joins

---

## 🎯 Key Learning Outcomes

- ✅ Real-time WebSocket communication with Socket.io
- ✅ Full-stack development (React frontend + Node.js backend)
- ✅ Redux state management patterns
- ✅ Deployment automation with CI/CD
- ✅ Responsive design for multiple devices
- ✅ Room-based architecture for isolated game sessions
- ✅ Git workflow and version control

---

## 🚧 Future Enhancements

- [ ] Player authentication and user accounts
- [ ] Persistent leaderboard (MongoDB integration)
- [ ] Chat feature between players
- [ ] Game history and replay
- [ ] AI opponent for single-player mode
- [ ] Multiple game modes (4x4, 5x5 grids)
- [ ] Real-time notifications

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check backend URL in `Create.jsx` and `Game.jsx`
- Ensure backend is running on Render or localhost:4444
- Check CORS settings in `Backend/app.js`

### Socket.io connection timeout
- Verify Socket.io port is accessible
- Check firewall settings
- For Render: backend may need 30-50 seconds to wake up on first request (free tier behavior)

### Game state not syncing
- Ensure Socket.io events are properly emitted
- Check browser console for errors
- Verify both players are in the same room

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👤 Author

**Arnav Bansal**
- GitHub: [@Krypto-Knight-05](https://github.com/Krypto-Knight-05)
- LinkedIn: [Arnav Bansal](https://www.linkedin.com/in/arnav-bansal-175968314/)
- Email: bansalarnav05@gmail.com

---

## 🙏 Acknowledgments

- Socket.io documentation and community
- React.js and Redux documentation
- Express.js guides
- Vercel and Render for free hosting

---

## 🎉 Thanks for Playing!

If you enjoyed the game, please give this repository a ⭐ star on GitHub!

Happy Gaming! 🎮✨
