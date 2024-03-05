import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { BlockQuery, MineBlockQuery } from 'types/Block';

export const getBlocks = async () => {
  return new apiClient('').get(APIs.block.getBlocks);
};
export const getBlock = async (query: BlockQuery) => {
  const url = APIs.block.getBlock.replace('{blockNumber}', query.blockNumber.toString());
  return new apiClient('').get(url);
};
export const mineBlock = async (query: MineBlockQuery) => {
  const payload = {
    miner_address: query.minerAddress,
  };
  return new apiClient('').post(APIs.block.mine, payload);
};
