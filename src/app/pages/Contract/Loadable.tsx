import { lazyLoad } from 'utils/loadable';

export const Contract = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
