// import './TicTacToe.css'

// const TicTacToe = ({turn, grid, status, turnComplete, reset})=>{

//     const buttons = []; // we’ll manually push JSX elements into this array

//     grid.forEach((value, index) => {
//         buttons.push(
//         <button
//             key={index}
//             id={index}
//             onClick={(e) => turnComplete(e.target.id)}
//         >
//             {value === 1 ? "❌" : value === 0 ? "⭕" : ""}
//         </button>
//         );
//     });

//     return (
//         <div className="Grid">
//         {buttons}
//         {status == 'ongoing' ? 
//             (turn? <h1>Your Turn</h1> : <h1>Opponents Turn</h1>) :
//             <h1>{status}</h1>
//         }
//         <button onClick={()=>reset()}>Restart</button>
//         </div>
//     );
// };  

// export default TicTacToe;


import './TicTacToe.css'

const TicTacToe = ({turn, grid, status, turnComplete, reset})=>{

  return (
    <div className="tictactoe-container">
      <div className="container">
        {grid.map((value, index) => (
          <button
            key={index}
            id={index}
            className="box"
            onClick={() => turnComplete(index)}
            disabled={status !== 'ongoing'}
          >
            {value === 1 ? "❌" : value === 0 ? "⭕" : ""}
          </button>
        ))}
      </div>

      <div className="game-info">
        {/* Show turn indicator ONLY when game is ongoing */}
        {status === 'ongoing' ? (
          <div className={`player-turn ${turn ? 'turn-active' : 'turn-inactive'}`}>
            {turn ? 'Your Turn ✓' : "Opponent's Turn ⏳"}
          </div>
        ) : (
          /* Show game status when finished */
          <div className={`game-status status-${status}`}>
            {status === 'win' && '🎉 You Won!'}
            {status === 'lose' && '😢 You Lost!'}
            {status === 'tie' && '🤝 It\'s a Draw!'}
          </div>
        )}

        <button className="btn btn-reset" onClick={reset}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
