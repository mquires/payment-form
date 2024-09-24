import { Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import FieldErrorMessage from '../../FieldErrorMessage';
import styles from './NumberFormaController.module.scss';

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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: fieldOnChange, value }, fieldState: { error } }) => (
        <>
          <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
            {label}{required && '*'}
          </Typography>
          <NumericFormat
            className={styles.numericFormatField}
            value={value}
            onValueChange={(values) => {
              fieldOnChange(values.value);
              if (onChange) onChange(values.value);
            }}
            thousandSeparator={isLithuanian ? ' ' : ','}
            decimalSeparator={isLithuanian ? ',' : '.'}
            decimalScale={2}
            fixedDecimalScale={true}
            {...rest}
          />
          {error && <FieldErrorMessage message={error.message} />}
        </>
      )}
    />
  );
};

export default NumberFormatController;
