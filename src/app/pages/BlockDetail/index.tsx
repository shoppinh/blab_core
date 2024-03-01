import { MainLayout } from 'app/layouts';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding: ${pxToRem(20)}rem;
`;

const BlockDetail = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('blockDetail.title')} headerTitle={t('blockDetail.title')}>
      <Container>
        <div>BlockDetail</div>
      </Container>
    </MainLayout>
  );
};

export default BlockDetail;
