import { EBackdropLoading, EButton, EInput, ETextArea } from 'app/components';
import { MainLayout } from 'app/layouts';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTransactionError, getTransactionLoading } from 'store/selectors/transaction';
import { getBalance, getKeyPair } from 'store/selectors/wallet';
import { useTransactionSlice } from 'store/slices/transaction';
import { useWalletSlice } from 'store/slices/wallet';
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

const SectionInfo = styled.div`
  font: 400 ${pxToRem(18)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  width: 100%;
`;

const ContentWrapper = styled.div`
  padding: 0 ${pxToRem(40)}rem;
  width: 100%;
`;

const ActionSection = styled.div`
  margin: ${pxToRem(30)}rem 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(20)}rem;
  margin: ${pxToRem(10)}rem 0;
`;

const InputTitle = styled.p`
  min-width: ${pxToRem(100)}rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${pxToRem(20)}rem 0;
  align-items: center;
`;

const SendButton = styled(EButton)`
  font: 400 ${pxToRem(16)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
  background-color: ${(p) => p.theme.background};
  border: 1px solid ${(p) => p.theme.text};
  padding: ${pxToRem(5)}rem ${pxToRem(15)}rem;

  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;

const Transaction = () => {
  const { t } = useTranslation();
  const keyPair = useSelector(getKeyPair);
  const balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const { actions: walletActions } = useWalletSlice();
  const { actions: transactionActions } = useTransactionSlice();
  const [toAddress, setToAddress] = useState('');
  const [data, setData] = useState('');
  const [value, setValue] = useState(0);
  const [isFormSent, setIsFormSent] = useState(false);
  // Handle send transaction
  const handleSend = useCallback(() => {
    if (toAddress && data && keyPair?.address && keyPair?.privateKey) {
      setIsFormSent(true);
      const proximateTimestamp = Math.floor((new Date().getTime() - 1000) / 1000);
      dispatch(
        transactionActions.doCreateTransaction({
          data,
          to: toAddress,
          value: value > 0 ? value : 0,
          // get current timestamp in seconds
          timestamp: proximateTimestamp,
          from: keyPair?.address ?? '',
          privateKey: keyPair?.privateKey ?? '',
          publicKey: keyPair?.publicKey ?? '',
        })
      );
    }
  }, [
    data,
    dispatch,
    keyPair?.address,
    keyPair?.privateKey,
    keyPair?.publicKey,
    toAddress,
    transactionActions,
    value,
  ]);

  const isLoading = useSelector(getTransactionLoading);
  const transactionError = useSelector(getTransactionError);

  // Fetch balance on load
  useEffect(() => {
    if (keyPair?.address && !balance) {
      dispatch(walletActions.doFetchBalance({ address: keyPair.address }));
    }
  }, [balance, dispatch, keyPair?.address, walletActions]);

  useEffect(() => {
    if (isFormSent && !isLoading && transactionError) {
      toast.error(transactionError.message ?? 'Error');
      setIsFormSent(false);
    } else if (isFormSent && !isLoading && !transactionError) {
      toast.success('Transaction sent successfully');
      setIsFormSent(false);
    }
  }, [isFormSent, isLoading, transactionError]);

  return (
    <MainLayout title={t('transaction.title')} headerTitle={t('transaction.title')}>
      <Container>
        <ContentWrapper>
          <SectionInfo>{`Address: ${keyPair?.address ?? ''}`}</SectionInfo>
          <SectionInfo>{`Balance: ${balance ?? ''}`}</SectionInfo>
          <ActionSection>
            <InputWrapper>
              <InputTitle>{t('transaction.to') as ReactNode}</InputTitle>
              <EInput
                placeholder={t('transaction.to')}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>{t('transaction.value') as ReactNode}</InputTitle>
              <EInput
                placeholder={t('transaction.value')}
                type='number'
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>{t('transaction.data') as ReactNode}</InputTitle>
              <ETextArea
                rows={15}
                placeholder={t('transaction.data')}
                onChange={(e) => setData(e.target.value)}
              />
            </InputWrapper>
            <ButtonWrapper>
              <SendButton onClick={handleSend}>{t('transaction.send')}</SendButton>
            </ButtonWrapper>
          </ActionSection>
        </ContentWrapper>
        <EBackdropLoading isShow={isLoading ?? false} />
      </Container>
    </MainLayout>
  );
};

export default Transaction;
