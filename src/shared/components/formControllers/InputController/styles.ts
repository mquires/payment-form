import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '6px',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    transformOrigin: 'left',
    transition: 'all 0.2s ease',
    padding: '0 4px',
    pointerEvents: 'none',
    fontSize: '0.875rem',
    color: '#8C8C8C',
  },
  '& .MuiInputLabel-shrink': {
    top: '5px',
    transform: 'translateY(0)',
    padding: '0 4px',
    left: '12px',
    fontSize: '0.75rem',
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 12px 8px',
  },
});

export default StyledTextField;
