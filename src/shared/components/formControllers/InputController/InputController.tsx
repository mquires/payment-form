import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyledTextField } from './styles';

interface InputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

interface IExtendedInputProps {
  required?: boolean;
  type: string;
  helperText?: string;
}

const InputController = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  required,
  type,
  inputRef,
  ...rest
}: InputControllerProps<T> & IExtendedInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <StyledTextField
            type={type}
            helperText={helperText || (error ? error.message : '')}
            error={!!error}
            onChange={onChange}
            value={value || ''}
            fullWidth
            label={label}
            size='small'
            required={required}
            inputRef={inputRef}
            {...rest}
          />
        </>
      )}
    />
  );
};

export default InputController;
