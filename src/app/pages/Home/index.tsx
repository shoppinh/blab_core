import { MainLayout } from 'app/layouts';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('admin.home.title')} headerTitle={t('admin.home.title')}>
      <div>s</div>
    </MainLayout>
  );
};

export default Home;
