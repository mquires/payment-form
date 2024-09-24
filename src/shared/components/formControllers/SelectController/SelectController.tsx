import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select from '../../Select';
import FieldErrorMessage from '../../FieldErrorMessage';
import { SelectProps } from '../../Select/Select';

interface ISelectControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export const SelectController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  fullWidth,
  ...rest
}: ISelectControllerProps<T> & SelectProps) => {
  const { palette } = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Typography fontSize="14px" fontWeight={400} color={palette.grey[500]}>
            {label}{required && '*'}
          </Typography>
          <Select
            label={''}
            required={required}
            defaultValue=""
            onChange={onChange}
            value={value || ''}
            fullWidth={fullWidth}
            {...rest}
            disabled={disabled}
          />
          {error && <FieldErrorMessage message={error.message} />}
        </>
      )}
    />
  );
};

export default SelectController;
