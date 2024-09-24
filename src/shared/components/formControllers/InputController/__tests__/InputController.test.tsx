import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import InputController from '../InputController';

interface RenderWithFormProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  helperText?: string;
}

const renderWithForm = (props: RenderWithFormProps) => {
  const Wrapper = () => {
    const { control } = useForm({
      defaultValues: {
        [props.name]: '',
      },
    });

    return <InputController control={control} {...props} />;
  };

  return render(<Wrapper />);
};

describe('InputController', () => {
  it('renders the input field and label correctly', () => {
    renderWithForm({
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      required: true,
    });

    expect(screen.getByText('Test Input*')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    renderWithForm({
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      required: true,
    });

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'New value' } });

    expect(input).toHaveValue('New value');
  });

  it('displays helperText when provided', () => {
    renderWithForm({
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      helperText: 'Helper text here',
      required: false,
    });

    expect(screen.getByText('Helper text here')).toBeInTheDocument();
  });

  it('renders as required when the required prop is passed', () => {
    renderWithForm({
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      required: true,
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
});
