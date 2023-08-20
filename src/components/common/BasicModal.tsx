import { Box, IconButton, Modal } from "@mui/material"
import { ReactNode } from "react"
import ModalContent from "../../model/ModalContent";
import { useSelectorModal } from "../../redux/store";
import { useDispatch } from "react-redux";
import { modalActions } from "../../redux/slices/modalSlice";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC = () => {
  const modalContent: ModalContent = useSelectorModal();
  const dispatch = useDispatch();

  return <Modal
    open={!!modalContent.content}
    onClose={() => dispatch(modalActions.reset())}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
        onClick={() => dispatch(modalActions.reset())}
        color='inherit'
        aria-label="Info">
        <CloseIcon />
      </IconButton>
      
      {modalContent.content}
    </Box>

  </Modal>
}

export default BasicModal