import StatusType from "./StatusType"

type Response<T> = {
  data: T,
  status: StatusType,
  message: string
}

export default Response