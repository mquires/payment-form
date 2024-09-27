import { FormControl, InputLabel, OutlinedInput, Select as MuiSelect, SelectProps as MuiSelectProps } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import React from 'react';

export interface SelectProps<T = string> {
  value?: T;
  onChange?: (value?: T) => void;
  label?: string;
  fullWidth?: boolean;
  name?: string;
  id?: string;
  width?: string;
  children: React.ReactNode;
}

const Select = <T,>({
  value,
  onChange,
  label,
  disabled,
  fullWidth = false,
  width = '200px',
  name = '',
  id = '',
  children,
}: SelectProps<T> & Omit<MuiSelectProps, keyof SelectProps<T>>): JSX.Element => {
  const handleChange: SelectInputProps['onChange'] = (e) => {
    onChange?.(e.target.value as T);
  };

  return (
    <FormControl disabled={disabled} fullWidth={fullWidth} sx={{ width: fullWidth ? '100%' : width }}>
      <InputLabel id="select-filter" shrink>
        {label}
      </InputLabel>
      <MuiSelect
        labelId="select-filter"
        value={value || ''}
        onChange={handleChange}
        input={<OutlinedInput
          style={{
            padding: '16px 12px 8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: 'white',
       
          }}
        />}
        displayEmpty
        name={name}
        id={id}
        fullWidth={fullWidth}
        disabled={disabled}
        size='small'
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
