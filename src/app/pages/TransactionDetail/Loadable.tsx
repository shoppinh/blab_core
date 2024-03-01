/**
 * Asynchronously loads the component for RegisterPage
 */

import { lazyLoad } from 'utils/loadable';

export const TransactionDetail = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
