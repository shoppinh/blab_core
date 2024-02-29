import { MainLayout } from 'app/layouts';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  console.log('🚀 ~ Home ~ t:', t('routingFeature.titless'));
  return (
    <MainLayout title={t('home.title')} headerTitle={t('home.title')}>
      <div>{t('home.title') as ReactNode}</div>
    </MainLayout>
  );
};

export default Home;
