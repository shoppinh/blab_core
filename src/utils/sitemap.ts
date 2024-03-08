const SiteMap = {
  home: {
    title: 'home.title',
    link: '/',
    isProtected: false,
  },
  blockList: {
    title: 'blockList.title',
    link: '/blocks',
    isProtected: true,
  },
  blockDetail: {
    title: 'blockDetail.title',
    link: '/block-detail',
    isProtected: true,
  },
  transaction: {
    title: 'transaction.title',
    link: '/transaction',
    isProtected: true,
  },
  transactionPool: {
    title: 'transactionPool.title',
    link: '/transaction-pool',
    isProtected: true,
  },
  transactionDetail: {
    title: 'transactionDetail.title',
    link: '/transaction-detail',
    isProtected: true,
  },
  profile: {
    title: 'profile.title',
    link: '/profile',
    isProtected: true,
  },
  login: {
    title: 'login.title',
    link: '/login',
    isProtected: false,
  },
  register: {
    title: 'register.title',
    link: '/register',
    isProtected: false,
  },
  blabLibrary: {
    title: 'blabLibrary.title',
    link: process.env.BLAB_LIBRARY_URL ?? 'http://localhost:3002',
  },
  blabBuild: {
    title: 'blabBuild.title',
    link: process.env.BLAB_BUILD_URL ?? 'http://localhost:3001',
  },
};

export { SiteMap };
