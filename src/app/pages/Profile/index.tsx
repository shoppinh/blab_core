import { EButton } from 'app/components';
import { MainLayout } from 'app/layouts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBalance, getKeyPair } from 'store/selectors/wallet';
import { useWalletSlice } from 'store/slices/wallet';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { queryString } from 'utils/constants';
import { SiteMap } from 'utils/sitemap';

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height: 100%;
  padding: ${pxToRem(40)}rem;
`;

const SectionInfo = styled.div`
  font: 400 ${pxToRem(18)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  width: 100%;
  /* text-align: center; */
`;

const WalletDetailSection = styled.div`
  max-width: 50%;
  word-break: break-all;
`;

const HistoryDetailSection = styled.div``;
const SectionDetailInfo = styled.div`
  margin: ${pxToRem(10)}rem 0;
`;

const PrivateKeySection = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  gap: ${pxToRem(10)}rem;
  width: 100%;
`;

const HistoryDetailInfo = styled.div`
  margin: ${pxToRem(10)}rem 0;
  text-align: center;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ShowButton = styled(EButton)`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
  background-color: ${(p) => p.theme.background};
  border: 1px solid ${(p) => p.theme.text};
  padding: ${pxToRem(2)}rem ${pxToRem(10)}rem;

  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;

const Profile = () => {
  const { t } = useTranslation();
  const keyPair = useSelector(getKeyPair);
  const balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const { actions: walletActions } = useWalletSlice();
  const historyRenderedData = [
    '0XANasdmaASasdasdasdasdmasdasdjkawjdkcc',
    '0XANasdmaASasdasdasdasdmasdasdjkawjdkss',
    '0XANasdmaASasdasdasdasdmasdasdjkawjdkzz',
    '0XANasdmaASasdasdasdasdmasdasdjkawjdkww',
  ];
  const navigate = useNavigate();

  const [isShowPrivateKey, setIsShowPrivateKey] = useState(false);

  useEffect(() => {
    if (keyPair?.address && balance === null) {
      dispatch(walletActions.doFetchBalance({ address: keyPair.address }));
    }
  }, [balance, dispatch, keyPair?.address, walletActions]);
  return (
    <MainLayout title={t('profile.title')} headerTitle={t('profile.title')}>
      <Container>
        <WalletDetailSection>
          <SectionInfo>Wallet</SectionInfo>
          <PrivateKeySection>
            <SectionDetailInfo>{`Private key: ${
              isShowPrivateKey
                ? keyPair?.privateKey
                : Array.from(keyPair?.privateKey ?? '')
                    .fill('*')
                    .join('')
            }`}</SectionDetailInfo>
            <ShowButton onClick={() => setIsShowPrivateKey(!isShowPrivateKey)}>
              {isShowPrivateKey ? 'Hide' : 'Show'} private key
            </ShowButton>
          </PrivateKeySection>
          <SectionDetailInfo>{`Public key: ${keyPair?.publicKey}`}</SectionDetailInfo>
          <SectionDetailInfo>{`Address: ${keyPair?.address}`}</SectionDetailInfo>
          <SectionDetailInfo>{`Balance: ${balance}`}</SectionDetailInfo>
        </WalletDetailSection>
        <HistoryDetailSection>
          <SectionInfo>History</SectionInfo>
          {historyRenderedData.map((data) => (
            <HistoryDetailInfo
              key={data}
              onClick={() =>
                navigate({
                  pathname: SiteMap.transactionDetail.link,
                  search: `?${queryString.historyAddress}=${data}`,
                })
              }
            >
              {data}
            </HistoryDetailInfo>
          ))}
        </HistoryDetailSection>
      </Container>
    </MainLayout>
  );
};

export default Profile;
