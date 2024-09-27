import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, MenuItem, Snackbar, SnackbarCloseReason, Stack } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import InputController from './shared/components/formControllers/InputController/InputController';
import SelectController from './shared/components/formControllers/SelectController';
import LanguageSwitcher from './shared/components/LanguageSwitcher/LanguageSwitcher';
import NumberFormatController from './shared/components/formControllers/NumberFormatController/NumberFormatController';
import { FormControl } from './styles';

interface PaymentFormData {
  amount: number;
  payeeAccount: string;
  purpose: string;
  payerAccount: string;
  payee: string;
}

const payerAccounts = [
  { iban: 'LT307300010172619160', id: '1', balance: 1000.12 },
  { iban: 'LT307300010172619161', id: '2', balance: 2.43 },
  { iban: 'LT307300010172619162', id: '3', balance: -5.87 },
];

const App: React.FC = () => {
  const { t: translate, i18n: languageManager } = useTranslation();

  const { handleSubmit, control, watch, setError, clearErrors } = useForm<PaymentFormData>({
    resolver: yupResolver(Yup.object().shape({
      amount: Yup.number()
        .required(translate('validation.amountRequired'))
        .min(0.01, translate('validation.minimumAmount')),
      payeeAccount: Yup.string()
        .required(translate('validation.payeeAccountRequired')).test('validate-iban', translate('validation.invalidIban'), async (value) => {
          const response = await axios.get(`https://matavi.eu/validate?iban=${value}`);
          return response.data.valid;
        }),
      purpose: Yup.string().required(translate('validation.purposeRequired')).min(3, translate('validation.purposeMin')).max(135, translate('validation.purposeMax')),
      payerAccount: Yup.string().required(translate('validation.payerAccountRequired')),
      payee: Yup.string().required(translate('validation.payeeRequired')).max(70, translate('validation.payeeMax')),
    })),
    defaultValues: {
      amount: NaN,
      payeeAccount: '',
      purpose: '',
      payerAccount: '',
      payee: ''
    }
  });

  const [balance, setBalance] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const selectedPayerAccount = watch('payerAccount');
  const enteredAmount = watch('amount');
  const language = languageManager.language.toUpperCase() as 'EN' | 'LT';

  const formatAmount = (amount: number): string => {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    if (language === 'LT') {
      return new Intl.NumberFormat('lt-LT', options).format(amount);
    } else {
      return new Intl.NumberFormat('en-US', options).format(amount);
    }
  };

  const isDisabled = !balance || (enteredAmount > balance);

  useEffect(() => {
    const selectedAccount = payerAccounts.find(acc => acc.iban === selectedPayerAccount);
    if (selectedAccount) {
      setBalance(selectedAccount.balance);
    } else {
      setBalance(null);
    }
  }, [selectedPayerAccount]);

  useEffect(() => {
    if (balance !== null && !isNaN(enteredAmount) && enteredAmount) {
      if (enteredAmount > balance) {
        setError('amount', {
          type: 'manual',
          message: translate('validation.exceedsBalance'),
        });
      } else {
        clearErrors('amount');
      }
    }
  }, [enteredAmount, balance, setError, clearErrors, translate]);

  const onSubmit = (data: PaymentFormData) => {
    console.log('Form Data:', data);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 5000);
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" gap={2} justifyContent="space-between" alignItems='center'>
        <h1>{translate('form.title')}</h1>
        <LanguageSwitcher />
      </Stack>
      <SelectController
        id="payerAccount"
        name="payerAccount"
        control={control}
        label={translate('form.payerAccount')}
        required
        fullWidth
      >
        {payerAccounts.map((account) => (
          <MenuItem key={account.id} value={account.iban}>
            {translate('form.formattedBalance', { iban: account.iban, balance: formatAmount(Number(account.balance)) })}
          </MenuItem>
        ))}
      </SelectController>
      <NumberFormatController
        name="amount"
        control={control}
        language={language}
        label={translate('form.amount')}
        required
      />
      <InputController
        type="text"
        name="payeeAccount"
        control={control}
        label={translate('form.payeeAccount')}
        required
      />
      <InputController
        type="text"
        name="payee"
        control={control}
        label={translate('form.payee')}
        required
      />
      <InputController
        type="text"
        name="purpose"
        control={control}
        label={translate('form.purpose')}
        required
      />
      <Button
        sx={{
          mt: 2,
          backgroundColor: '#759bfa',
          borderRadius: '20px',
          padding: '15px 0',
        
        }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isDisabled}
      >
        {translate('form.button')}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {translate('form.submitSuccess')}
        </Alert>
      </Snackbar>
    </FormControl>
  )
}

export default App;
