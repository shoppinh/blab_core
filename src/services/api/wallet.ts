import apiClient from 'services/base/apiClient';
import { BalanceQuery } from 'types/Wallet';
import { APIs } from '../base/type';

export const generateKeyPair = async () => {
  return new apiClient('').get(APIs.wallet.generateKeyPair);
};
export const getBalance = async (query: BalanceQuery) => {
  const url = APIs.wallet.getBalance.replace('{address}', query.address);
  return new apiClient('').get(url);
};
