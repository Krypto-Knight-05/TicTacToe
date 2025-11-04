export default function checkGameStatus(grid) {
  // Define all winning combinations
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  // Check if any winning pattern is matched
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    
    // Check if all three positions have the same value and it's not -1
    if (grid[a] !== -1 && grid[a] === grid[b] && grid[a] === grid[c]) {
      return {
        winner: grid[a], // Return 0 or 1 (the winner)
        status: 'win',
        winningPattern: pattern
      };
    }
  }

  // Check if grid is full (no -1 values left)
  let flag = true;
  for(let i = 0; i < 9; i++){
    if (grid[i] == -1){
      flag = false;
      break;
    }
  }

  if (flag == true) {
    return {
      winner: null,
      status: 'tie'
    };
  }

  // Game is still ongoing
  return {
    winner: null,
    status: 'ongoing'
  };
}
