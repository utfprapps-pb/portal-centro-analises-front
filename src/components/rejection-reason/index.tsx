import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { SolicitationResponse } from '@/services/api/aprovacoes/aprovacoes.type';
import AprovacoesService from '@/services/api/aprovacoes/AprovacoesService';
import styles from './styles.module.scss'
import toast from 'react-hot-toast';

const RejectionModal = ({ isOpen, onRequestClose, handleChangePage, solicitationId }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [apiError, setApiError] = useState('')

  const handleClose = () => {
    onRequestClose();
  };

  const handleReject = () => {
    let response: SolicitationResponse = {
            id: solicitationId,
            status: 'REFUSED',
            reason: rejectReason
          };

        AprovacoesService.response(response)
        .then((response) => {
            toast.success("Rejeitado!")
            setApiError('')
            handleChangePage(null, 0);
            handleClose();  // Fechar o modal aqui
        })
        .catch((responseError) => {
            setApiError('Falha ao rejeitar.')
            toast.error(apiError)
            console.log(responseError)
        })
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 1,
          padding: 2,  
          width: '25%'
        }}
      >
        <Typography variant="h5" id="modal-title" gutterBottom>
          Motivo da Rejeição
        </Typography>
        
        <TextField
          multiline
          rows={5}
          variant="outlined"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          style={{width: '100%'}}
          inputProps={{ maxLength: 500 }}
        />
        
        <Box
          sx={{
            marginTop: 1,
            display: 'flex'
          }}
        >
          <Button variant="contained" color="primary" onClick={handleReject} style={{ marginRight: '4px' }}>
            Confirmar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RejectionModal;
