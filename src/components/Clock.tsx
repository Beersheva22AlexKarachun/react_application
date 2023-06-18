import { CSSProperties } from "react"
type Props = {
    time: string,
    country: string,
}
export const Clock: React.FC<Props> = ({time, country}) => {
    const style: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    return <div style={style}>
        <header>Time in {country}</header>
        <p>{time}</p>
    </div>
}