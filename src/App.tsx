import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cellSizeActions } from "./redux/slices/cellSizeSlice"
import { directionActions } from "./redux/slices/flexDirectionSlice"
import Lifes from "./components/Lifes"
import Input from "./components/common/Input"
import InputResult from "./module/InputResult"
import { lifeCountActions } from "./redux/slices/lifeCountSlice"

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(cellSizeActions.setSize())
      dispatch(directionActions.setDirection())
    })
  }, [])

  function submitFn(number: string): InputResult {
    const res: InputResult = { status: "success", message: '' };
    dispatch(lifeCountActions.setCount(+number));
    return res;
  }
  return <div>
    <Input submitFn={submitFn} buttonTitle="Go life" inputType="number" placeholder="Enter a number of games..." />
    <Lifes />
  </div>
}

export default App