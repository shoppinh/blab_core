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
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
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
  padding-left: ${pxToRem(12)}rem;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavigationGroup = styled.div`
  display: none;
  margin-top: ${pxToRem(10)}rem;
  ${media.md`
    display: block;
  `}
  padding: 0 ${pxToRem(12)}rem;
`;
const ButtonGroup = styled.div`
  display: none;
  ${media.md`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;
const DesktopStyledButton = styled(NavigationButton)`
  display: none;
  padding-top: ${pxToRem(10)}rem;
  ${media.md`
    display: block;
  `}
`;
const Header: React.FC<Props> = ({ headerTitle }) => {
  const currentUser = useSelector(getUserProfile);
  const navigationList = useMemo(() => {
    return [
      {
        id: 1,
        url: '/dashboard',
        iconName: 'partei-home',
      },
      {
        id: 2,
        url: '/chat',
        iconName: 'partei-bubbles3',
      },
      {
        id: 3,
        url: '/profile',
        iconName: 'partei-user',
      },
    ];
  }, []);

  const location = useLocation();
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>{headerTitle}</HeaderTitle>
      </HeaderWrapper>
      <ButtonGroup>
        <NavigationGroup>
          {navigationList.map((navigationItem) => (
            <Link to={navigationItem.url} key={navigationItem.id}>
              <StyledIcon
                className={navigationItem.iconName}
                isActive={navigationItem.url === location.pathname}
              />
            </Link>
          ))}
        </NavigationGroup>
        <DesktopStyledButton>
          <StyledIcon className='partei-bell' />
        </DesktopStyledButton>
      </ButtonGroup>
    </Container>
  );
};

export default Header;
