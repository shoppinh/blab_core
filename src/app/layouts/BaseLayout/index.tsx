import { EToast } from 'app/components';
import { getSystemSettings } from 'store/selectors/system';
import { useSystemSlice } from 'store/slices/system';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Container = styled.div`
  ${tw`h-screen`}
  overflow: auto;
  background-color: ${(p) => p.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseLayout: React.FC<Props> = ({ children, title }) => {
  const { actions: systemActions } = useSystemSlice();
  const systemSettings = useSelector(getSystemSettings);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!systemSettings) {
      dispatch(systemActions.loadSystemSetting());
    }
  }, [systemActions, dispatch, systemSettings]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='og:title' content={title} />
      </Helmet>
      <Container>{!!children && children}</Container>
      <EToast newestOnTop={true} />
    </>
  );
};

export default React.memo(BaseLayout);
