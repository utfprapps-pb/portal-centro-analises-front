import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface DropdownProps {
  value: string;
  onChange: (selectedValue: string) => void;
}

const DropdownMov: React.FC<DropdownProps> = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState( { value: 'DEPOSIT', label: 'Depositar' },);

  const options = [
    { value: 'DEPOSIT', label: 'Depositar' },
    { value: 'WITHDRAW', label: 'Retirar' },
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
