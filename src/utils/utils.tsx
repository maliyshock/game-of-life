import {COLS, HUMAN_COLOR, RESOLUTION, ROWS} from "../const";
import Konva from "../../node_modules/konva";

type gridType = Array<Array<number>>

type loopThroughArray = {
	array: gridType,
	callback: (i:number, j:number) => void
}

export function loopThroughArray(object: loopThroughArray) {
	const {
		array,
		callback
	} = object

	const cols = array.length;
	const rows = array[0].length;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			callback(i, j)
		}
	}
}

export function createGrid() {
	let grid = make2DArray(COLS, ROWS);

	loopThroughArray({
		array: grid,
		callback: (i, j) => {
			grid[i][j] = Math.round(Math.random())
		}
	})

	return grid;
}

type countNeighborsArgs = {
	array: gridType,
	x: number,
	y: number,
	cols?: number,
	rows?: number,
	range: number,
}

export function countNeighbors(args:countNeighborsArgs) {
	const {
		array,
		x,
		y,
		cols = COLS,
		rows = ROWS,
		range
	} = args
	let sum = 0;
	for (let i = - range; i <= range; i++) {
		for (let j = - range; j <= range; j++) {
			// wrap out the screen.
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += array[col][row];
		}
	}
	sum -= array[x][y];
	return sum;
}

export function make2DArray(cols:number, rows:number) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

export function drawCurrentGrid(grid: Array<Array<number>>, gameField:Konva.Stage) {
	let layer = new Konva.Layer();
	gameField.add(layer);

	loopThroughArray({
		array: grid,
		callback: (i, j) => {
			// get the coordinates
			let x = i * RESOLUTION;
			let y = j * RESOLUTION;
			if (grid[i][j] === 1) {
				// create shape
				let box = new Konva.Rect({
					x: x,
					y: y,
					width: RESOLUTION - 1,
					height: RESOLUTION - 1,
					fill: HUMAN_COLOR,
				});

				layer.add(box);
			}
		}
	})
}

export function drawNewGrid(grid:Array<Array<number>>) {
	let nextGrid = make2DArray(COLS, ROWS);

	loopThroughArray({
		array: grid,
		callback: (i, j) => {
			let state = grid[i][j];
			// Count live neighbors!
			let sum = 0;
			let neighbors = countNeighbors({
				array: grid,
				x: i,
				y: j,
				range: 1,
			});

			// keep alive condition
			if (state == 0 && neighbors == 3) {
				nextGrid[i][j] = 1;
				// dead condition
			} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				nextGrid[i][j] = 0;
				// same condition
			} else {
				nextGrid[i][j] = state;
			}
		}
	})

	return nextGrid
}

export function createItemToTheLayer() {

}
