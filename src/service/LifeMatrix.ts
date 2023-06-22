import { getRandomMatrix } from "../util/random"
import config from "../config/game-config.json"
import { range } from "../util/number-functions"

export default class LifeMatrix {
    constructor(private _matrix: number[][]) {
    }

    get matrix() {
        return this._matrix
    }

    next(): number[][] {
        this._matrix = this._matrix.map((row, i) => this._getNewRow(row, i))
        return this._matrix
    }

    private _getNewRow(row: number[], i: number): number[] {
        return row.map((cell, j) => {
            const totalNeighbors = this._countCellsInMatrix3x3(i, j) - cell
            return this._getCellState(cell, totalNeighbors)
        })
    }

    private _countCellsInMatrix3x3(i: number, j: number): number {
        return range(i - 1, i + 2)
            .map(index => this._countNeighborsInRow(index, j - 1, j + 1))
            .reduce((res, x) => res + x)
    }

    private _countNeighborsInRow(iRow: number, start: number, end: number) {
        start = start > 0 ? start : 0
        return this._matrix[iRow]?.slice(start, end + 1).reduce((res, x) => res + x, 0) ?? 0
    }

    private _getCellState(cell: number, totalNeighbors: number): any {
        if (cell) {
            return totalNeighbors < config.underpopulation || totalNeighbors > config.overpopulation ? 0 : 1
        } else {
            return totalNeighbors === config.reproduction ? 1 : 0
        }
    }
}