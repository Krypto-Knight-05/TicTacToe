// import {Routes, Route, NavLink} from "react-router"
// //import { useNavigate } from 'react-router-dom'
// import './App.css';
// import Join from './Join'
// import Create from './Create'
// import Game from "./Game"

// const App = ()=>{
//   return (
//     <div>

//       <NavLink className="navlink" to = "/createRoom">Create a Room</NavLink>
//       <NavLink className="navlink" to = "/joinRoom">Join a Room</NavLink>


//       <Routes>
//         <Route path="/" element={<Join />} />
//         <Route path="/create" element={<Create />} />
//         <Route path="/game" element={<Game />} />
//       </Routes>
      

//     </div>
//   )
// }

// export default App

import {Routes, Route, Link} from "react-router-dom"
import './App.css';
import Join from './Join'
import Create from './Create'
import Game from "./Game"

const Home = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Tic Tac Toe Online</h1>
        <p>Play with your friends in real-time!</p>
      </div>
      
      <div className="btn-container">
        <Link to="/create">
          <button className="btn-submit">Create Room</button>
        </Link>
        <Link to="/join">
          <button className="btn-submit">Join Room</button>
        </Link>
      </div>
    </div>
  );
}

const App = ()=>{
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create" element={<Create />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;

