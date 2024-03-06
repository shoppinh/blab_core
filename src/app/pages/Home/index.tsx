import { MainLayout } from 'app/layouts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { SiteMap } from 'utils/sitemap';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding: ${pxToRem(20)}rem;
`;

const NavigationGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(20)}rem;
`;

const NavigationLink = styled(Link)`
  font-size: ${pxToRem(16)}rem;
  padding: ${pxToRem(10)}rem;
  border: 1px solid ${(p) => p.theme.text};
  border-radius: ${pxToRem(10)}rem;
  text-decoration: none;
  color: ${(p) => p.theme.text};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const navigationList = useMemo(() => {
    return [
      {
        id: 1,
        url: SiteMap.blockList.link,
        name: t(SiteMap.blockList.title),
      },
      {
        id: 2,
        url: SiteMap.blabBuild.link,
        name: t(SiteMap.blabBuild.title),
      },
      {
        id: 3,
        url: SiteMap.blabLibrary.link,
        name: t(SiteMap.blabLibrary.title),
      },
    ];
  }, [t]);
  return (
    <MainLayout title={t('home.title')} headerTitle={t('home.title')}>
      <Container>
        <NavigationGroup>
          {navigationList.map((navigationItem) => (
            <NavigationLink to={navigationItem.url} key={navigationItem.id} target='_blank'>
              {navigationItem.name}
            </NavigationLink>
          ))}
        </NavigationGroup>
      </Container>
    </MainLayout>
  );
};

export default Home;
