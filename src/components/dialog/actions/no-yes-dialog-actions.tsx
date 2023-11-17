import { Button, DialogActions } from "@mui/material";

export interface NoYesDialogActionsProps {
  onNoClick: () => void;
  onYesClick: () => void;
}

export function NoYesDialogActions(props: Readonly<NoYesDialogActionsProps>) {
  return (
    <DialogActions>
      <Button onClick={props.onNoClick} autoFocus>Não</Button>
      <Button onClick={props.onYesClick}>Sim</Button>
    </DialogActions>
  )
}