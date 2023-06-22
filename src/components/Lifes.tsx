import { useDispatch, useSelector } from "react-redux"
import { useSelectorCount, useSelectorDirection } from "../redux/store";
import { useEffect } from "react";
import { lifeCountActions } from "../redux/slices/lifeCountSlice";
import LifeGame from "./LifeGame";
import { range } from "../util/number-functions";
import Input from "./common/Input";
import InputResult from "../module/InputResult";


const Lifes: React.FC = () => {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(lifeCountActions.setCount(4))
    // }, [])
    const flexDirection = useSelectorDirection();
    const lifesCount = useSelectorCount();

    return <section style={{
        display: "flex",
        flexDirection,
        alignItems: "center",
        justifyContent: "space-around",
        height: "100vh",
    }}>
        {Array.from({ length: lifesCount }).map(_ => <LifeGame />)}
    </section>
}

export default Lifes