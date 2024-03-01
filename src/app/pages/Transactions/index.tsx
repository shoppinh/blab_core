import { MainLayout } from 'app/layouts';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Transactions = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('transactions.title')} headerTitle={t('transactions.title')}>
      <div>Home</div>
    </MainLayout>
  );
};

export default Transactions;
