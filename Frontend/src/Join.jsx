// import { useRef } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router"
// import { change } from "./redux/Slice"
// import './Pages.css';

// const Join = ()=>{

//     const inpRef = useRef();
//     const navigate = useNavigate()
//     const code = useSelector((state)=>state.code.value)
//     const dispatch = useDispatch();

//     function RoomChecker(){
//         dispatch(change(inpRef.current.value))
//         navigate('/game')
//     }

//     return(
//         <div>
//             <input ref={inpRef} type="text" placeholder="Enter Room Code"></input>
//             <button onClick={()=>{RoomChecker()}}>Join</button>
//         </div>
//     )
// }

// export default Join

import { useRef } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { change } from "./redux/Slice"
import './Pages.css';

const Join = ()=>{
  const inpRef = useRef();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  function RoomChecker(){
    if (inpRef.current.value.trim() === '') {
      alert('Please enter a room code');
      return;
    }
    dispatch(change(inpRef.current.value))
    navigate('/game')
  }

  return(
    <div className="page-container">

        <Link to="/">
          <button className="btn-home">Home</button>
        </Link>

      <div className="page-header">
        <h1>Join Room</h1>
        <p>Enter the room code to join an existing game</p>
      </div>

      <div className="form-group">
        <label htmlFor="roomCode">Room Code</label>
        <input
          id="roomCode"
          ref={inpRef}
          type="text"
          placeholder="Enter room code"
        />
      </div>

      <div className="btn-container">
        <button className="btn-submit" onClick={RoomChecker}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default Join;
