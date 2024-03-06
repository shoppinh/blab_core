import { MainLayout } from 'app/layouts';
import React, { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactionSlice } from 'store/slices/transaction';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { queryString } from 'utils/constants';
import { useQuery } from 'utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionDetail } from 'store/selectors/transaction';
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
  const transactionHash = useQuery().get(queryString.transactionHash);
  const { actions: transactionActions } = useTransactionSlice();
  const transactionDetail = useSelector(getTransactionDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    if (transactionHash) {
      dispatch(transactionActions.doFetchTransactionDetail(transactionHash));
    }
  }, [dispatch, transactionActions, transactionHash]);
  return (
    <MainLayout title={t('transactionDetail.title')} headerTitle={t('transactionDetail.title')}>
      <Container>
        <SectionTitle>{t('transactionDetail.title') as ReactNode}</SectionTitle>
        <InfoWrapper>
          <TransactionDetailInfo>{`Tx Hash: ${transactionDetail?.hash ?? ''}`}</TransactionDetailInfo>
          <TransactionDetailInfo>{`Timestamp: ${transactionDetail?.timestamp ?? 0}`}</TransactionDetailInfo>
          <TransactionDetailInfo>{`From: ${transactionDetail?.from ?? ''}`}</TransactionDetailInfo>
          <TransactionDetailInfo>{`To: ${transactionDetail?.to ?? ''}`}</TransactionDetailInfo>
          {/* <TransactionDetailInfo>Block</TransactionDetailInfo> */}
        </InfoWrapper>
      </Container>
    </MainLayout>
  );
};

export default TransactionDetail;
