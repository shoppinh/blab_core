import React, { ReactNode, useCallback, useState } from 'react';
import Web3 from 'web3';
import greeterAbi from './abi.json';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { EButton, EInput } from 'app/components';
import { MainLayout } from 'app/layouts';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: ${pxToRem(20)}rem 0;
  gap: ${pxToRem(10)}rem;
`;

const SendButton = styled(EButton)`
  font: 400 ${pxToRem(16)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
  background-color: ${(p) => p.theme.background};
  border: 1px solid ${(p) => p.theme.text};
  padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;

  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;
const ResultSection = styled.div``;

const Contract = () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL);
  const privateKey = process.env.REACT_APP_PRIVATE_KEY ?? '';
  const addressContract = process.env.REACT_APP_CONTRACT_ADDRESS ?? '';
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<unknown>();
  const { t } = useTranslation();
  const getGreeting = useCallback(async () => {
    {
      const contract = new web3.eth.Contract(greeterAbi, addressContract);
      const result = await contract.methods.greet().call();
      setResult(result);
    }
  }, [addressContract, web3.eth.Contract]);
  const setGreeting = useCallback(
    async (input: string) => {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = new web3.eth.Contract(greeterAbi, addressContract);
      const transaction = contract.methods.setGreeting(input);

      const gas = await transaction.estimateGas({ from: account.address });
      const gasPrice = await web3.eth.getGasPrice();
      const data = transaction.encodeABI();
      const nonce = await web3.eth.getTransactionCount(account.address);
      const signedTransaction = await web3.eth.accounts.signTransaction(
        {
          to: addressContract,
          data,
          gas,
          gasPrice,
          nonce,
        },
        privateKey
      );
      await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      toast.success('Transaction sent');
    },
    [addressContract, privateKey, web3.eth]
  );
  return (
    <MainLayout title={t('transaction.title')} headerTitle={t('transaction.title')}>
      <Container>
        <ContentWrapper>
          <ActionSection>
            <InputWrapper>
              <InputTitle>{t('contract.input') as ReactNode}</InputTitle>
              <EInput
                placeholder={t('contract.input')}
                onChange={(e) => setInput(e.target.value)}
              />
            </InputWrapper>
            <ButtonWrapper>
              <SendButton onClick={() => setGreeting(input)}>{t('contract.set')}</SendButton>
              <SendButton onClick={getGreeting}>{t('contract.get')}</SendButton>
            </ButtonWrapper>
          </ActionSection>
          <ResultSection>
            <InputTitle>{t('contract.result') as ReactNode}</InputTitle>
            <SectionInfo>{JSON.stringify(result, null, 2) ?? ''}</SectionInfo>
          </ResultSection>
        </ContentWrapper>
      </Container>
    </MainLayout>
  );
};

export default Contract;
