export enum AcceptType {
  json = 'application/json',
  formData = 'multipart/form-data',
  urlEncode = 'application/x-www-form-urlencoded',
}

export enum GrantType {
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password',
}

export const APIs = {
  user: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refreshToken: '/api/auth/refresh-token',
    info: 'api/user/profile/',
    registerInfo: '/api/auth/register',
    registerDeviceToken: 'api/auth/device-token',
    platformSetting: '/api/user/platform/setting',
    languageUpdate: 'api/user/language/update',
    sendInvitation: 'api/user/send-invitation',
    uploadFile: 'api/file/upload',

    // registerVerifyCode: 'api/user/register/verifyCode',
    // registerSetPassword: '/api/user/register/setPassword',
    // registerReSendCode: 'api/user/register/resendCode',
    // forgetPassword: '/api/user/forgetPassword',
    // forgetVerifyCode: '/api/user/forgetVerifyCode',
    // forgetSetPassword: '/api/user/forgetSetPassword',
  },
  block: {
    getBlocks: '/api/block/',
    getBlock: '/api/block/{blockNumber}',
    mine: '/api/block/mine',
  },
  transaction: {
    createTransaction: '/api/transaction/',
    signTransaction: '/api/transaction/sign',
    getTransactionPool: '/api/transaction/pool',
  },
  wallet: {
    generateKeyPair: '/api/wallet/',
    getBalance: '/api/wallet/balance/{address}',
  },
};
