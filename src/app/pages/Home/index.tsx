import BaseLayout from 'app/layouts/BaseLayout';
import BackgroundImage from 'assets/images/background.jpg';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { SiteMap } from 'utils/sitemap';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: ${pxToRem(20)}rem;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const NavigationGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(20)}rem;
  width: 50%;
  margin-top: ${pxToRem(40)}rem;
`;

const NavigationLink = styled(Link)`
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow:
    rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  &:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  &:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  &:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  &:focus {
    outline: 1px transparent;
  }

  &:before {
    display: none;
  }

  &:-webkit-details-marker {
    display: none;
  }
`;
const Wrapper = styled.div`
  ${tw`h-screen`}
  overflow: auto;
`;
const Home = () => {
  const { t } = useTranslation();
  const navigationList = useMemo(() => {
    return [
      {
        id: 1,
        url: SiteMap.blockList.link,
        name: t(SiteMap.blabCore.title),
      },
      {
        id: 3,
        url: SiteMap.blabLibrary.link,
        name: t(SiteMap.blabLibrary.title),
      },
      {
        id: 2,
        url: SiteMap.blabBuild.link,
        name: t(SiteMap.blabBuild.title),
      },
    ];
  }, [t]);
  return (
    <Wrapper>
      <Helmet>
        <title>{t('home.title') as string}</title>
        <meta name='og:title' content={t('home.title')} />
      </Helmet>
      <Container>
        <NavigationGroup>
          {navigationList.map((navigationItem) => (
            <NavigationLink to={navigationItem.url} key={navigationItem.id} target='_blank'>
              {navigationItem.name}
            </NavigationLink>
          ))}
        </NavigationGroup>
      </Container>
    </Wrapper>
  );
};

export default Home;
