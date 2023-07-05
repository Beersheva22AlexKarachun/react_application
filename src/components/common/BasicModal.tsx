import { Box, Modal } from "@mui/material"
import { ReactNode } from "react"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  onCloseHandler?: () => void,
  content: ReactNode,
}

const BasicModal: React.FC<Props> = ({ onCloseHandler, content }) => {
  return <Modal
    open={true}
    onClose={onCloseHandler}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {content}
    </Box>
  </Modal>
}

export default BasicModal