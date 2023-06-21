import { ReactNode, useRef } from "react"
import Row from "./Row"
import { calculateLog } from "../util/log-functions"
import config from "../config/game-config.json"

const Matrix: React.FC<{ matrix: number[][] }> = ({ matrix }) => {
    const divSize = useRef<number>();
    if (matrix.length && !divSize.current) {
        divSize.current = config.defaultMatrixSize / matrix.length * config.defaultDivSize
        // divSize.current = calculateLog(matrix.length, config.points[1], config.points[2])
    }

    function getRows(): ReactNode {
        return matrix.map((row, i) => <Row row={row} key={i} divSize={divSize.current!} />)
    }
    return <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {getRows()}
    </section>
}

export default Matrix
