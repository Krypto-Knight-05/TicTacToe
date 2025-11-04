import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { change, changeArray, changeStatus, changeTurn, initialiseTurn } from "./redux/Slice";
import TicTacToe from "./TicTacToe";
import './Pages.css';
import { Link } from "react-router";


const Create = ()=>{
  const socketRef = useRef(null);
  const code = useSelector((state)=>state.code.value);
  const turn = useSelector((state)=>state.turn);
  const grid = useSelector((state)=>state.grid);
  const status = useSelector((state)=>state.status);

  const dispatch = useDispatch();
  const value = 0;
  
  function turnComplete(index){
    if(turn && grid[index] === -1){
      console.log('Create: Making move at index', index);
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
    // socketRef.current = io("http://localhost:4444");
    socketRef.current = io("https://tictactoe-mzaw.onrender.com");
    
    // Set up event listeners IMMEDIATELY after connection
    socketRef.current.on('room', (data)=>{
      console.log('Create: Assigned room', data.room);
      dispatch(change(data.room));
      dispatch(initialiseTurn(false));
    });

    socketRef.current.on('turnChange', (data)=>{
      console.log('Create: Received turnChange', data);
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
      console.log('Create: Received win');
      dispatch(changeStatus('win'))
    })

    socketRef.current.on('tie', (data)=>{
      console.log('Create: Received tie');
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
      console.log('Create: Received restart');
      for(let i = 0; i<=8; i++){
        dispatch(changeArray({index: i, value: -1}))
      }
      dispatch(changeStatus('ongoing'))

      socketRef.current.emit('clearGrid')
    })     

    socketRef.current.on('playerJoined', ({message})=>{
      console.log(message);
    })

    for(let i = 0; i<=8; i++){
      dispatch(changeArray({index: i, value: -1}))
    }
    dispatch(changeStatus('ongoing'))

    // Cleanup
    return () => {
      console.log('Create: Disconnecting socket');
      socketRef.current.off('room');
      socketRef.current.off('turnChange');
      socketRef.current.disconnect();
    };
  }, [dispatch]);

  // return(
  //   <div>
  //     <h1>Current Room: {code}</h1>
  //     <h2>Your Turn: {turn ? 'Yes' : 'No'}</h2>
  //     <TicTacToe turn={turn} grid={grid} status={status} turnComplete={turnComplete} reset={reset} />
  //   </div>
  // );

  return(
    <div className="page-container">

      <Link to="/">
        <button className="btn-home">Home</button>
      </Link>     

      <div className="page-header">
        <h1>Room Code: {code}</h1>
        <p>Share this code with your friend</p>
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

export default Create; 
