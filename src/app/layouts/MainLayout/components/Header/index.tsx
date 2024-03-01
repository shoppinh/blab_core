import { getUserProfile } from 'app/store/selectors/session';
import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { SiteMap } from 'utils/sitemap';

interface Props {
  headerTitle: string;
}

interface LinkProps {
  isActive?: boolean;
}

const Container = styled.div`
  height: ${StyleConstants.HEADER_HEIGHT}px;
  background-color: ${(p) => p.theme.backgroundVariant};
  width: 100%;
  border-bottom: ${pxToRem(1)}rem solid ${(p) => p.theme.borderLight};
`;

const HeaderTitle = styled.p`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  flex: 2;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${pxToRem(10)}rem;
  height: 100%;
`;

const ProfileTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  flex: 2;
  text-align: end;
`;
const NavigationGroup = styled.div`
  display: block;
  flex: 3;
  display: flex;
  justify-content: space-between;
`;

const NavigationLink = styled(Link)<LinkProps>`
  font-size: ${pxToRem(16)}rem;
  ${(p) => p.isActive && `color: ${p.theme.danger}`};
`;

const Header: React.FC<Props> = ({ headerTitle }) => {
  const currentUser = useSelector(getUserProfile);
  const { t } = useTranslation();
  const navigationList = useMemo(() => {
    return [
      {
        id: 1,
        url: '/',
        iconName: 'partei-bubbles3',
        name: 'Block',
        subRoutes: [SiteMap.blockDetail.link],
      },
      {
        id: 2,
        url: '/transaction',
        iconName: 'partei-user',
        name: 'Transaction',
      },
      {
        id: 3,
        url: '/transaction-pool',
        iconName: 'partei-user',
        name: 'Transaction Pool',
      },
    ];
  }, []);

  const location = useLocation();
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>
          <Link to={SiteMap.home.link}>{t('home.title') as ReactNode}</Link>
        </HeaderTitle>
        <NavigationGroup>
          {navigationList.map((navigationItem) => (
            <NavigationLink
              to={navigationItem.url}
              key={navigationItem.id}
              isActive={
                navigationItem.url === location.pathname ||
                navigationItem.subRoutes?.includes(location.pathname)
              }
            >
              {navigationItem.name}
            </NavigationLink>
          ))}
        </NavigationGroup>
        <ProfileTitle>
          <Link to='/profile'>{currentUser?.username ?? (t('profile.title') as ReactNode)}</Link>
        </ProfileTitle>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
