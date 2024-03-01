import { MainLayout } from 'app/layouts';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('home.title')} headerTitle={t('home.title')}>
      <div>Home</div>
    </MainLayout>
  );
};

export default Home;
