import { getRandomMatrix } from "../util/random"
import Matrix from "./Matrix"
import config from "../config/game-config.json"
import LifeMatrix from "../service/LifeMatrix"
import { useEffect, useRef, useState } from "react"
import { Blinker, GosperGliderGun } from "./Patterns"
import { extendMatrix } from "../util/matrix-function"

// const startMatrix = extendMatrix(GosperGliderGun, config.field.height, config.field.width)
// const startMatrix = Blinker
function startMatrix(): number[][] {
    return getRandomMatrix(config.field.height, config.field.width, 0, 2)
}

const LifeGame: React.FC = () => {
    const lifeMatrix = useRef<LifeMatrix>();
    const [matrix, setMatrix] = useState<number[][]>([])

    function tickFn(): void {
        if (!lifeMatrix.current) {
            lifeMatrix.current = new LifeMatrix(startMatrix())
            setMatrix(lifeMatrix.current.matrix)
        } else {
            setMatrix(lifeMatrix.current.next())
        }
    }

    useEffect(() => {
        const intervalId = setInterval(tickFn, config.interval)
        return () => clearInterval(intervalId)
    })
    return <Matrix matrix={matrix} />
}

export default LifeGame