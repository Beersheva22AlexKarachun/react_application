import { ReactNode } from "react"

type ModalContent = {
  closeFn?: () => void,
  content: ReactNode
}

export default ModalContent