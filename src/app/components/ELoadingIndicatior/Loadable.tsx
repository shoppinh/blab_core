/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ELoadingIndicator = lazyLoad(
  () => import('./index'),
  (module) => module.ELoadingIndicator,
  {
    fallback: <></>,
  }
);
