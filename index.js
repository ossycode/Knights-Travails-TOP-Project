import gameBoard from "./game-board.js";
import { uiController } from "./ui-move.js";

const controller = (function() {
    gameBoard()
    uiController()
})();