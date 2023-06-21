export function extendMatrix(matrix: number[][], height: number, width: number, defaultValue: number = 0): number[][] {
    function updateHeight() {
        const difference = Array.from({ length: height - matrix.length }).map(row => new Array(matrix[0].length).fill(defaultValue))
        matrix = matrix.concat(difference)
    }
    function updateWidth() {
        matrix = matrix.map(row => row.concat(new Array(width - matrix[0].length).fill(defaultValue)))
    }

    height > matrix.length && updateHeight()
    width > matrix[0].length && updateWidth()
    return matrix
}

