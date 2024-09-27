import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select from '../../Select';
import FieldErrorMessage from '../../FieldErrorMessage';
import { SelectProps } from '../../Select/Select';
import { StyledBox, StyledLabel } from './styles';

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <StyledBox>
            <Select
              value={value || ''}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={onChange}
              fullWidth={fullWidth}
              disabled={disabled}
              {...rest}
            />
            <StyledLabel isFocused={isFocused} hasValue={!!value}>
              {label}{required && '*'}
            </StyledLabel>
          </StyledBox>
          {error && <FieldErrorMessage message={error.message} />}
        </>
      )}
    />
  );
};

export default SelectController;
