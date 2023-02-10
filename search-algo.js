import { displayMoves } from "./display-moves.js";

// Using the Graph Breadth-First-Search algo for the moves

const squareRegistry = new Map();


// Get/Set current coords to the board
const chessSquare = (x, y) => {
    const xPosition = x;
    const yPosition = y;
    let predecessor;

    // Define array for hardcoded possible moves of knight
    const KNIGHT_MOVES = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ]

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPredecessor) => {
        predecessor = predecessor || newPredecessor;
    }

    const name = () => `${x}, ${y}`;

    // Evaluate current possible knight moves against offsets
    const possibleKnightMoves = () => {
        return KNIGHT_MOVES
            .map((offset) => newSquareFrom(offset[0], offset[1]))
            .filter((square) => square !== undefined);
    }
// Calculate new set of square coords against the offsets  
  const newSquareFrom = (xOffset, yOffset) => {        
    const [newX, newY] = [xPosition + xOffset, yPosition + yOffset];       
     if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {          
           return chessSquare(newX, newY);        
        } 
    }
       // Get/Set map constructor object name(s)
    if (squareRegistry.has(name())) {
        return squareRegistry.get(name());
    }else {
        const newSquare = {name, getPredecessor, setPredecessor, possibleKnightMoves}
        squareRegistry.set(name(), newSquare);
        return newSquare;
    }
}

// Intake the click coords from user and run the search algo
const knightTravails = (start, finish) => {    squareRegistry.clear();
    const origin = chessSquare(...start);    const target = chessSquare(...finish);
    const queue = [origin];    while (!queue.includes(target)) {        const currentSquare = queue.shift();
        const enqueueList = currentSquare.possibleKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
    }
    const path = [target]
    while (!path.includes(origin)) {
    const preSquare = path[0].getPredecessor();
    path.unshift(preSquare);
    }
    // console.log(`The shortest path was ${path.length -1} moves`);
    // console.log("The moves were: ");
    let squareCoord = [];
    path.forEach(square => {
    // console.log(square.name())
    squareCoord.push(square.name())
    });
    displayMoves(path, squareCoord);
};

export { knightTravails }