import { BlockList, Home, Login, Register } from 'app/pages';
import { ProtectedRoute } from 'app/routes';
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
        <Route
          path={SiteMap.blockList.link}
          element={
            <ProtectedRoute unAuthenticatedRedirectTo={SiteMap.login.link}>
              <BlockList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
