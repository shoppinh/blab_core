import { EButton, EIcon } from 'app/components';
import { getUserProfile } from 'app/store/selectors/session';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { media } from 'styles';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';

interface Props {
  headerTitle: string;
}

interface NavigationIconProps {
  isActive?: boolean;
}

const Container = styled.div`
  height: ${StyleConstants.HEADER_HEIGHT}px;
  background-color: ${(p) => p.theme.background};
  width: 100%;
  border-bottom: ${pxToRem(1)}rem solid ${(p) => p.theme.borderLight};
`;
const NavigationButton = styled(EButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  && {
    background-color: ${(p) => p.theme.background};
  }
`;

const StyledIcon = styled(EIcon)<NavigationIconProps>`
  font-size: ${pxToRem(25)}rem;
  color: ${(p) => (p.isActive ? p.theme.backgroundVariant : p.theme.placeholder)};
  margin: 0 ${pxToRem(10)}rem;
`;

const HeaderTitle = styled.p`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  flex: 1;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${pxToRem(10)}rem;
`;

const ProfileTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  flex: 1;
  text-align: end;
`;
const NavigationGroup = styled.div`
  display: block;
  flex: 2;
  display: flex;
  justify-content: space-between;
`;

const Header: React.FC<Props> = ({ headerTitle }) => {
  const currentUser = useSelector(getUserProfile);
  const navigationList = useMemo(() => {
    return [
      {
        id: 1,
        url: '/',
        iconName: 'partei-home',
        name: 'Home',
      },
      {
        id: 2,
        url: '/block',
        iconName: 'partei-bubbles3',
        name: 'Block',
      },
      {
        id: 3,
        url: '/transactions',
        iconName: 'partei-user',
        name: 'Transactions',
      },
      {
        id: 4,
        url: '/transaction-pool',
        iconName: 'partei-user',
        name: 'Transaction Pool',
      },
      {
        id: 5,
        url: '/profile',
        iconName: 'partei-user',
        name: 'Profile',
      },
    ];
  }, []);

  const location = useLocation();
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <NavigationGroup>
          {navigationList.map((navigationItem) => (
            <Link to={navigationItem.url} key={navigationItem.id}>
              {/* <StyledIcon
                className={navigationItem.iconName}
                isActive={navigationItem.url === location.pathname}
              /> */}
              {navigationItem.name}
            </Link>
          ))}
        </NavigationGroup>
        <ProfileTitle>{headerTitle}</ProfileTitle>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
