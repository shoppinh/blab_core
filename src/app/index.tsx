import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConstantRoles } from 'utils/constants';
import { SiteMap } from 'utils/sitemap';
import { Home, Register, Login, BlockList } from 'app/pages'
import { ProtectedRoute } from 'app/routes';
export function App() {
  const { i18n } = useTranslation();

  return <BrowserRouter>
    <Helmet
      titleTemplate='%s - ParTe'
      defaultTitle='ParTe'
      htmlAttributes={{ lang: i18n.language }}
    >
      <meta name='description' content='ParTe' />
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
          <ProtectedRoute
            unAuthenticatedRedirectTo={SiteMap.login.link}
          >
            <BlockList />
          </ProtectedRoute>
        }
      />
    </Routes>

  </BrowserRouter>;
} 
