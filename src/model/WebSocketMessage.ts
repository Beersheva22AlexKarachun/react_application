type WebSocketMessage = {
  operation: "added" | "updated" | "deleted",
  payload: string
}

export default WebSocketMessage