import { Alert, Snackbar } from "@mui/material"
import { useSelectorAlert } from "../../redux/store"
import { alertActions } from "../../redux/slices/alertSlice"
import { useDispatch } from "react-redux"

type Props = {
  autoHideDuration: number
}

const SnackAlert: React.FC<Props> = ({ autoHideDuration }) => {
  const alert = useSelectorAlert();
  const dispatch = useDispatch();

  return <Snackbar open={!!alert.message} autoHideDuration={autoHideDuration}
    onClose={() => dispatch(alertActions.reset())}>
    <Alert onClose={() => dispatch(alertActions.reset())} severity={alert.status} sx={{ width: '100%' }}>
      {alert.message}
    </Alert>
  </Snackbar>
}

export default SnackAlert