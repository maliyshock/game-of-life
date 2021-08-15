import {WIDTH, HEIGHT, GAME_SPEED} from "./const";
import Konva from "konva";
import './scss/index.scss'
import {createGrid, drawCurrentGrid, drawNewGrid} from "./utils/utils";
import {make2DArray} from "./utils/make2Darray";

const gameField = new Konva.Stage({
  container: 'gameField',
  width: WIDTH,
  height: HEIGHT,
});

let grid = createGrid();

setInterval(() => {
  gameField.destroyChildren();
  drawCurrentGrid(grid, gameField);
  grid = drawNewGrid(grid)
}, GAME_SPEED)
