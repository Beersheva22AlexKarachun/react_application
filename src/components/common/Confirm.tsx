import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { ReactNode, useState } from "react";
import { Action } from "rxjs/internal/scheduler/Action";
import ActionType from "../../model/ActionType";

export type Props = {
  open: boolean,
  dialogTitle: string,
  dialogContent?: string,
  closeHandler: () => void;
  actions: ActionType[];
}

const Confirm: React.FC<Props> = ({ dialogTitle, dialogContent, closeHandler, actions, open }) => {
  function getButtons(): ReactNode {
    return actions.map(action => <Button onClick={() => action.action()} key={action.title}>{action.title}</Button>);
  }

  return <Box>
    <Dialog
      open={open}
      onClose={() => closeHandler()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>

      {dialogContent && <DialogContent>
        <DialogContentText id="alert-dialog-description" style={{ whiteSpace: "pre-wrap" }}>
          {dialogContent}
        </DialogContentText>
      </DialogContent>}

      <DialogActions>
        {getButtons()}
      </DialogActions>
    </Dialog>
  </Box>
}

export default Confirm