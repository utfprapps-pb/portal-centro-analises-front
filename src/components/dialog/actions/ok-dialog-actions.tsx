import { Button, DialogActions } from "@mui/material";

export interface OkDialogActionsProps {
  onOkClick: () => void;
}

export function OkDialogActions(props: Readonly<OkDialogActionsProps>) {
  return (
    <DialogActions>
      <Button onClick={props.onOkClick} autoFocus>Ok</Button>
    </DialogActions>
  )
}