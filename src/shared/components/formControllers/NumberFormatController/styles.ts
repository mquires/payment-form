import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';

export const StyledBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const StyledLabel = styled(Typography)<{ isFocused: boolean; hasValue: boolean }>(({ isFocused, hasValue }) => ({
  fontSize: isFocused || hasValue ? '0.75rem' : '1.2rem',
  fontWeight: 400,
  color: '#8C8C8C',
  position: 'absolute',
  top: isFocused || hasValue ? '5px' : '50%',
  left: '12px',
  transform: isFocused || hasValue ? 'translateY(0)' : 'translateY(-50%)',
  transition: 'all 0.2s ease',
  pointerEvents: 'none',
  backgroundColor: 'white',
  padding: '0 4px',
}));

export const StyledNumericFormat = styled(NumericFormat)({
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '32px 16px 24px 16px',
  border: 'none',
  fontWeight: 500,
  fontSize: '2rem',
  '&:focus': {
    outline: 'none',
  },
});