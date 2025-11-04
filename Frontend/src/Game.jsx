import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import TicTacToe from "./TicTacToe";
import { changeArray, changeStatus, changeTurn, initialiseTurn } from "./redux/Slice";
import './Pages.css';
import { Link } from "react-router";

const Game = ()=>{
  const socketRef = useRef(null);
  const code = useSelector((state)=>state.code.value);
  const turn = useSelector((state)=>state.turn);
  const grid = useSelector((state)=>state.grid);
  const status = useSelector((state)=>state.status);
  const dispatch = useDispatch();
  const value = 1;
  
  function turnComplete(index){
    if(turn && grid[index] === -1){
      console.log('Game: Making move at index', index);
      dispatch(changeArray({ index: Number(index), value }));
      dispatch(changeTurn());
      socketRef.current.emit('turnChange', {
        index: Number(index), 
        value 
      });
    }
  }

  function reset(){
  for(let i = 0; i<=8; i++){
    dispatch(changeArray({index: i, value: -1}))
  }
  dispatch(changeStatus('ongoing'))
  socketRef.current.emit('restart')
}

  useEffect(()=>{
    // Create socket connection
    socketRef.current = io("http://localhost:4444");
    
    // Set up event listeners FIRST
    socketRef.current.on('turnChange', (data)=>{
      console.log('Game: Received turnChange', data);
      dispatch(changeArray({ 
        index: data.index,
        value: data.value
      }));
      dispatch(changeTurn());

      socketRef.current.emit('UpdateGrid', data)
    });

    socketRef.current.on('lose', (data)=>{
      console.log('Game: Received lose', data);
      dispatch(changeArray({ 
        index: data.index,
        value: data.value
      }));
      dispatch(changeTurn());
      dispatch(changeStatus('lose'))
    })

    socketRef.current.on('win', ()=>{
      console.log('Game: Received win');
      dispatch(changeStatus('win'))
    })

    socketRef.current.on('tie', (data)=>{
      console.log('Game: Received tie');
      dispatch(changeStatus('tie'))
      if(data){
        dispatch(changeArray({ 
          index: data.index,
          value: data.value
        }));
        dispatch(changeTurn());
      }
    })

    socketRef.current.on('restart', ()=>{
      console.log('Game: Received restart');
      for(let i = 0; i<=8; i++){
        dispatch(changeArray({index: i, value: -1}))
      }
      dispatch(changeStatus('ongoing'))

      socketRef.current.emit('clearGrid')
    })    

    // THEN join room
    socketRef.current.emit('room', { code });
    console.log('Game: Joining room', code);
    
    //set array at initialisation
    for(let i = 0; i<=8; i++){
      dispatch(changeArray({index: i, value: -1}))
    }
    dispatch(changeStatus('ongoing'))    
    
    // Set turn for second player
    dispatch(initialiseTurn(true)); 

    // Cleanup
    return () => {
      console.log('Game: Disconnecting socket');
      socketRef.current.off('turnChange');
      socketRef.current.disconnect();
    };
  }, [code, dispatch]);
 

  // return(
  //   <div>
  //     <h1>Current Room: {code}</h1>
  //     <h2>Your Turn: {turn ? 'Yes' : 'No'}</h2>
  //     <TicTacToe turn={turn} grid={grid} status={status} turnComplete={turnComplete} reset = {reset}/>
  //   </div>
  // );

  return(
    <div className="page-container">

      <Link to="/">
        <button className="btn-home">Home</button>
      </Link>

      <div className="page-header">
        <h1>Room Code: {code}</h1>
        <p>Connected to game</p>
      </div>
      
      <TicTacToe 
        turn={turn} 
        grid={grid} 
        status={status} 
        turnComplete={turnComplete} 
        reset={reset} 
      />
    </div>
  );

}

export default Game;
