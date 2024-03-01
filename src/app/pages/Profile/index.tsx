import { MainLayout } from 'app/layouts';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('profile.title')} headerTitle={t('profile.title')}>
      <div>Profile</div>
    </MainLayout>
  );
};

export default Profile;
