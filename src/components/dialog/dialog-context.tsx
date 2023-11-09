import { DialogProps } from '@mui/material';
import * as React from 'react';

interface ContextValue {
  open,
  close
};
export const DialogContext: React.Context<ContextValue> = React.createContext({
  open: (props: DialogProps) => { },
  close: () => { },
});

export const useDialog = () => {
  return React.useContext(DialogContext);
};