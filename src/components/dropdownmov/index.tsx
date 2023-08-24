import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface DropdownProps {
  value: number;
  onChange: (selectedValue: number) => void;
  nome:string;
}

const DropdownMov: React.FC<DropdownProps> = ({ value, nome, onChange }) => {
  const [selectedOption, setSelectedOption] = useState( { value: 0, label: 'Depositar' },);

  const options = [
    { value: 0, label: 'Depositar' },
    { value: 1, label: 'Retirar' },
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: '16px',
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '16px',
    }),
  };

  const handleSelect = (selectedOption : any) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption.value);
  };

  useEffect(() => {
    // Set the initial value when the value prop changes
    const initialValue = options.find((option) => option.value === value);
    if(initialValue != null) {
      setSelectedOption(initialValue);
    }
  }, [value]);

  return (
    <div>
      <Select
        name={nome}
        value={selectedOption}
        onChange={handleSelect}
        options={options}
        styles={customStyles}
        placeholder="Selecione o tipo de transação"
      />
    </div>
  );
};

export default DropdownMov;
