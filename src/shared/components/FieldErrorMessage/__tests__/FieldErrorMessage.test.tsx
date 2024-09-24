import React from 'react';
import { render, screen } from '@testing-library/react';
import FieldErrorMessage from '../FieldErrorMessage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('FieldErrorMessage Component', () => {
  const theme = createTheme();

  it('renders error message correctly as a string', () => {
    render(
      <ThemeProvider theme={theme}>
        <FieldErrorMessage message="This field is required." />
      </ThemeProvider>
    );
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });
});
