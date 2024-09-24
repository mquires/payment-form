import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n: languageManager } = useTranslation();
  const [language, setLanguage] = useState<'EN' | 'LT'>(languageManager.language.toUpperCase() as 'EN' | 'LT');

  const handleLanguageChange = (newLanguage: 'EN' | 'LT') => {
    setLanguage(newLanguage);
    languageManager.changeLanguage(newLanguage.toLowerCase());
  };

  const renderButton = (lang: 'EN' | 'LT', label: string) => (
    <Button
      variant={language === lang ? 'contained' : 'outlined'}
      onClick={() => handleLanguageChange(lang)}
    >
      {label}
    </Button>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
      {renderButton('EN', 'English')}
      {renderButton('LT', 'Lithuanian')}
    </div>
  );
};

export default LanguageSwitcher;
