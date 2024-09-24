import {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type TextFieldProps = Omit<MuiTextFieldProps, 'size'>;