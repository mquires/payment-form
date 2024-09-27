import { Box, styled, Typography } from "@mui/material";

export const StyledBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const StyledLabel = styled(Typography)<{ isFocused: boolean; hasValue: boolean }>(({ isFocused, hasValue }) => ({
  fontSize: isFocused || hasValue ? '0.75rem' : '0.875rem',
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