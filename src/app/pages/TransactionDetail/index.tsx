import { MainLayout } from 'app/layouts';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  height: 100%;
  padding: ${pxToRem(40)}rem;
`;

const SectionTitle = styled.div`
  font: 400 ${pxToRem(18)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  margin: ${pxToRem(20)}rem 0;
  width: 100%;
  text-align: center;
`;

const InfoWrapper = styled.div``;

const TransactionDetailInfo = styled.div`
  margin: ${pxToRem(10)}rem 0;
`;

const TransactionDetail = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('transactionDetail.title')} headerTitle={t('transactionDetail.title')}>
      <Container>
        <SectionTitle>{t('transactionDetail.title') as ReactNode}</SectionTitle>
        <InfoWrapper>
          <TransactionDetailInfo>Tx Hash: </TransactionDetailInfo>
          <TransactionDetailInfo>Timestamp</TransactionDetailInfo>
          <TransactionDetailInfo>From</TransactionDetailInfo>
          <TransactionDetailInfo>To</TransactionDetailInfo>
          <TransactionDetailInfo>Block</TransactionDetailInfo>
        </InfoWrapper>
      </Container>
    </MainLayout>
  );
};

export default TransactionDetail;
