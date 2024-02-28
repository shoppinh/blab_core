/**
 * Asynchronously loads the component for BlockList
 */

import { lazyLoad } from 'utils/loadable';

export const BlockList = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
