import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FormValues {
  [key: string]: string;
}

interface IFieldErrorMessageProps {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<FormValues>> | undefined;
}

const FieldErrorMessage: React.FC<IFieldErrorMessageProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="space-between" mt="4px" alignItems="start">
      <Typography fontSize="0.75rem" lineHeight="23px" color={theme.palette.error.main}>
        {`${message}` || ''}
      </Typography>
    </Stack>
  );
};

export default FieldErrorMessage;
