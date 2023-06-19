import React, { useState } from 'react';
import Select from 'react-select';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: '0', label: 'Aguardando Confirmação do Orientador' },
    { value: '1', label: 'Aguardando Confirmação do Laboratório' },
    { value: '2', label: 'Aguardando Amostra' },
    { value: '3', label: 'Aguardando Análise' },
    { value: '4', label: 'Aguardando Pagamento' },
    { value: '5', label: 'Recusado' },
    { value: '6', label: 'Concluído' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '16px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '16px'
    })
  };

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleSelect}
        options={options}
        styles={customStyles}
        placeholder="Selecione um status"
      />
    </div>
  );
};

export default Dropdown;
