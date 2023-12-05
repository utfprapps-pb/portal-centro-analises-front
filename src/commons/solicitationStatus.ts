export const SOLICITATION_STATUS = {
    PENDING_ADVISOR: "PENDING_ADVISOR",
    PENDING_LAB: "PENDING_LAB",
    PENDING_SAMPLE: "PENDING_SAMPLE",
    APPROVED: "APPROVED",
    PENDING_PAYMENT: "PENDING_PAYMENT",
    FINISHED: "FINISHED",
    PENDING_CORRECTION: "PENDING_CORRECTION",
  };
  
  export const SOLICITATION_STATUS_OPTIONS = [
    { value: 'PENDING_ADVISOR', label: 'Aguardando Confirmação'},
    {  value: 'PENDING_LAB', label: 'Aguardando Laboratório'},
    {  value: 'PENDING_SAMPLE', label: 'Aguardando Amostra'},
    {  value: 'APPROVED', label: 'Aguardando Análise'},
    {  value: 'PENDING_PAYMENT', label: 'Aguardando Pagamento'},
    {  value: 'FINISHED', label: 'Concluído'},
    {  value: 'PENDING_CORRECTION', label: 'Aguardando Correção' },
  ];