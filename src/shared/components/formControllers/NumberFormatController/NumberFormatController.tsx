import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FieldErrorMessage from '../../FieldErrorMessage';
import { StyledBox, StyledLabel, StyledNumericFormat } from './styles';

interface InputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  onChange?: (value: string) => void;
  language: 'EN' | 'LT';
}

interface IExtendedInputProps {
  required?: boolean;
}

const NumberFormatController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  onChange,
  language,
  ...rest
}: InputControllerProps<T> & IExtendedInputProps) => {
  const isLithuanian = language === 'LT';

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: fieldOnChange, value }, fieldState: { error } }) => (
        <>
          <StyledBox>
            <StyledNumericFormat
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onValueChange={(values) => {
                fieldOnChange(values.value);
                if (onChange) onChange(values.value);
              }}
              thousandSeparator={isLithuanian ? ' ' : ','}
              decimalSeparator={isLithuanian ? ',' : '.'}
              decimalScale={2}
              fixedDecimalScale={true}
              placeholder=" "
              {...rest}
            />
            <StyledLabel isFocused={isFocused} hasValue={!!value}>
              {label}
              {required && '*'}
            </StyledLabel>
          </StyledBox>
          {error && <FieldErrorMessage message={error.message} />}
        </>
      )}
    />
  );
};

export default NumberFormatController;
