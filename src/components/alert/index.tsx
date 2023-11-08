import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertNoYesDialogProps {
  onClose?: () => void;
  title?: string;
  content?: string;
  onNoClick?: () => void;
  onYesClick?: () => void;
}

interface ContextValue { open, close };

const DialogContext: React.Context<ContextValue> = React.createContext({
  open: (props: AlertNoYesDialogProps) => { },
  close: () => { },
});

export const useDialog = () => {
  return React.useContext(DialogContext);
};

// https://mui.com/material-ui/react-dialog
export const DialogProvider = ({ children }) => {
  const [opened, setOpened] = React.useState(false);
  const [props, setProps] = React.useState<AlertNoYesDialogProps>({});

  const open = (props: AlertNoYesDialogProps): void => {
    setProps(props);
    setOpened(true);
  };

  const close = (): void => {
    setOpened(false);
  };

  const handleCloseDialog = () => {
    if (props.onClose)
      props.onClose();

    close();
  }

  const value = React.useMemo(() => ({ open, close }), []);
  return (
    <DialogContext.Provider value={value}>
      <Dialog
        open={opened}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onNoClick} autoFocus>Não</Button>
          <Button onClick={props.onYesClick}>Sim</Button>
        </DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
}