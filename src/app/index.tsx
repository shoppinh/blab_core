import {
  BlockDetail,
  BlockList,
  Contract,
  Home,
  Login,
  NotFound,
  Profile,
  Register,
  Transaction,
  TransactionDetail,
  TransactionPool,
} from 'app/pages';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteMap } from 'utils/sitemap';
export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate='%s - eth-core'
        defaultTitle='eth-core'
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name='description' content='eth-core' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href={process.env.REACT_APP_API_URL} />
      </Helmet>
      <Routes>
        <Route path={SiteMap.home.link} element={<Home />} />
        <Route path={SiteMap.register.link} element={<Register />} />
        <Route path={SiteMap.login.link} element={<Login />} />
        <Route path={SiteMap.blockList.link} element={<BlockList />} />
        <Route path={SiteMap.blockDetail.link} element={<BlockDetail />} />
        <Route path={SiteMap.transaction.link} element={<Transaction />} />
        <Route path={SiteMap.transactionPool.link} element={<TransactionPool />} />
        <Route path={SiteMap.transactionDetail.link} element={<TransactionDetail />} />
        <Route path={SiteMap.profile.link} element={<Profile />} />
        <Route path={SiteMap.contract.link} element={<Contract />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
