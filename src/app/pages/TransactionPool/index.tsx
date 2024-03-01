import { MainLayout } from 'app/layouts';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TransactionPool = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('txPool.title')} headerTitle={t('txPool.title')}>
      <div>Home</div>
    </MainLayout>
  );
};

export default TransactionPool;
