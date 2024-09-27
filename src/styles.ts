import { styled } from "@mui/material";

export const FormControl = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  border: 'none',

  '& .MuiSelect-select': {
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});