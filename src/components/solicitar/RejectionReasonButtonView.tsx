import React from 'react'
import { OkDialogActions } from "@/components/dialog/actions/ok-dialog-actions";
import { useDialog } from "@/components/dialog/dialog-context";
import { IconButton, Tooltip } from "@material-ui/core";
import { Warning } from "@material-ui/icons";

interface RejectionReasonButtonViewProps {
  visible: boolean;
  color: string;
  rejectionReason: string;
}

export const RejectionReasonButtonView: React.FC<RejectionReasonButtonViewProps> = (props: Readonly<RejectionReasonButtonViewProps>) => {
  const { open: openDialog, close: closeDialog } = useDialog();

  return (
    <>
      {props.visible &&
        <Tooltip title="Visualizar motivo da rejeição">
          <IconButton
            style={{ color: props.color }}
            onClick={() => {
              openDialog({
                title: 'Motivo da rejeição',
                content: props.rejectionReason,
                actions: OkDialogActions({
                  onOkClick: () => closeDialog()
                })
              })
            }}
          >
            <Warning />
          </IconButton>
        </Tooltip>}
    </>
  )
}
