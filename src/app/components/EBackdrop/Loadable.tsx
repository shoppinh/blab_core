/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const EBackdrop = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
