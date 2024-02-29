import React from 'react';
import tw, { styled } from 'twin.macro';
import { media } from '../../../styles';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import BaseLayout from '../BaseLayout';
import Header from './components/Header';

interface Props {
  children?: React.ReactNode;
  headerTitle: string;
  title: string;
}

const Center = styled.div`
  ${tw`flex-1`}
  height: 100%;
  background-color: ${(p) => p.theme.backBackground};
`;
const MainContent = styled.div`
  ${tw`flex-1`}
`;
const CenterWrapper = styled.div`
  ${tw`flex flex-row flex-1`}
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT * 2 + 5}px);
  ${media.md`
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT}px);
  `}
  width: 100%;
  padding: 0 ${pxToRem(10)}rem;
`;

const Container = styled.div`
  ${tw`flex flex-row`}
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT}px);
  ${media.md`
    height: 100vh;
  `}
  width: 100%;
`;

const NavigationBottomBar = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  width: 100%;
  background-color: red;
  ${media.md`
    display: none;
  `}
`;

const MainLayout: React.FC<Props> = ({ children, headerTitle, title }) => {
  return (
    <BaseLayout title={title}>
      <Container>
        <MainContent>
          <Header headerTitle={headerTitle} />
          <CenterWrapper>
            <Center>{!!children && children}</Center>
          </CenterWrapper>
        </MainContent>
      </Container>
      <NavigationBottomBar />
    </BaseLayout>
  );
};

export default React.memo(MainLayout);