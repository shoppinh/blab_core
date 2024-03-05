import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { CreateTransactionQuery, SignTransactionQuery } from 'types/Transaction';

export const createTransaction = async (query: CreateTransactionQuery) => {
  const payload = {
    from: query.from,
    to: query.to,
    value: query.value,
    data: query.data,
    timestamp: query.timestamp,
    signature: query.signature,
    public_key: query.publicKey,
  };
  return new apiClient('').post(APIs.transaction.createTransaction, payload);
};
export const signTransaction = async (query: SignTransactionQuery) => {
  const payload = {
    private_key: query.privateKey,
    from: query.from,
    to: query.to,
    value: query.value,
    data: query.data,
    timestamp: query.timestamp,
  };
  return new apiClient('').post(APIs.transaction.signTransaction, payload);
};
export const getTransactionPool = async () => {
  return new apiClient('').get(APIs.transaction.getTransactionPool);
};
