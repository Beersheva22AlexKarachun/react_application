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
        this._matrix = this._matrix.map((row, iRow) => {
            const newRow = row.map((cell, jColomn) => {
                const totalNeighbors = range(iRow - 1, iRow + 2)
                    .map(index => this._countNeighbors(index, jColomn - 1, jColomn + 1))
                    .reduce((res, x) => res + x)
                    - cell
                return this._getCellState(cell, totalNeighbors)
            })
            return newRow
        })
        return this._matrix
    }

    private _countNeighbors(iRow: number, start: number, end: number) {
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