import { ReactNode, useEffect, useRef, useState } from "react"
import Row from "./Row"
import { calculateLog } from "../util/log-functions"
import config from "../config/game-config.json"

function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / config.field.height - 2
}

const Matrix: React.FC<{ matrix: number[][] }> = ({ matrix }) => {
    const [divSize, setDivSize] = useState(getSize());
    useEffect(() => {
        function windowResizeHandler() {
            console.log(getSize())
            setDivSize(getSize())
        }
        window.addEventListener("resize", windowResizeHandler)
        return () => window.removeEventListener("resize", windowResizeHandler)
    }, [])
    // if (matrix.length && !divSize.current) {
    //     divSize.current = getSize()//config.defaultMatrixSize / matrix.length * config.defaultDivSize
    //     // divSize.current = calculateLog(matrix.length, config.points[1], config.points[2])
    // }

    function getRows(): ReactNode {
        return matrix.map((row, i) => <Row row={row} key={i} divSize={divSize} />)
    }
    return <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {getRows()}
    </section>
}

export default Matrix
