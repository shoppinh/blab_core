/**
 * Asynchronously loads the component for RegisterPage
 */

import { lazyLoad } from 'utils/loadable';

export const TransactionPool = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
