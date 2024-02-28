/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const EButton = lazyLoad(
  () => import('./index'),
  (module) => module.EButton,
  {
    fallback: <></>,
  }
);
