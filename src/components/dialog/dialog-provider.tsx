import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContext } from '@/components/dialog/dialog-context';

export interface DialogProps {
  title?: string;
  content?: string;
  actions?: any;
  onClose?: () => void;
}

// https://mui.com/material-ui/react-dialog
export const DialogProvider = ({ children }) => {
  const [opened, setOpened] = React.useState(false);
  const [props, setProps] = React.useState<DialogProps>({});

  const open = (props: DialogProps): void => {
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
        {props.actions ??
          <DialogActions>
            <Button onClick={close} autoFocus>Fechar</Button>
          </DialogActions>
        }
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
}