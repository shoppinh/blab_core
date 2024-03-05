import { EButton, EInput, ETextArea } from 'app/components';
import { MainLayout } from 'app/layouts';
import React, { ReactNode } from 'react';
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
  padding: ${pxToRem(5)}rem ${pxToRem(10)}rem;

  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;

const Transaction = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('transaction.title')} headerTitle={t('transaction.title')}>
      <Container>
        <ContentWrapper>
          <SectionInfo>Address: 0xFA580BE09d1yc</SectionInfo>
          <SectionInfo>Balance: 217.22 BLAB</SectionInfo>
          <ActionSection>
            <InputWrapper>
              <InputTitle>{t('transaction.to') as ReactNode}</InputTitle>
              <EInput placeholder={t('transaction.to')} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>{t('transaction.data') as ReactNode}</InputTitle>
              <ETextArea rows={15} placeholder={t('transaction.data')} />
            </InputWrapper>
            <ButtonWrapper>
              <SendButton>{t('transaction.send')}</SendButton>
            </ButtonWrapper>
          </ActionSection>
        </ContentWrapper>
      </Container>
    </MainLayout>
  );
};

export default Transaction;