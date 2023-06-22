import { CSSProperties, ReactNode } from "react"
import { useSelectorCount, useSelectorSize } from "../redux/store"

function getDivs(numbers: number[], divSize: number): ReactNode {
    return numbers.map((number, i) => <div key={i} style={getStyle(number, divSize)}></div>)
}

function getStyle(number: number, divSize: number): CSSProperties {
    return { width: divSize, height: divSize, backgroundColor: number ? "black" : "white", border: "1px solid grey" }
}

const Row: React.FC<{ row: number[], divSize: number }> = ({ row, divSize }) => {
    const size = useSelectorSize();
    const lifesCount = useSelectorCount();

    return <section style={{ display: "flex" }}>
        {getDivs(row, size / lifesCount)}
    </section>
}
export default Row