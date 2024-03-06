import { all, call, put, takeLatest } from 'redux-saga/effects';
import { blockActions as actions } from '../slices/block';
import { apiGetBlock, apiGetBlocks, apiMineBlock } from 'services/api/apiHelper';
import { PayloadAction } from '@reduxjs/toolkit';
import { BlockListItem, BlockQuery, MineBlockQuery } from 'types/Block';
export function* blockSaga() {
  yield all([
    takeLatest(actions.doFetchBlocks, fetchBlocksSaga),
    takeLatest(actions.doFetchBlock, fetchBlockSaga),
    takeLatest(actions.doMineBlock, mineBlockSaga),
  ]);
}

export function mapBlocks(blocks: any[]): BlockListItem[] {
  return blocks.map((block) => {
    return mapBlock(block);
  });
}

export function mapBlock(block: any): BlockListItem {
  return {
    blockNumber: block.block_number,
    hash: block.hash,
    miner: block.miner,
    totalSent: block.totalSent,
    binary: block.binary,
    nonce: block.nonce,
    difficulty: block.difficulty,
    parentHash: block.parent_hash,
    transactions: block.transactions,
    timestamp: block.timestamp,
  };
}

export function* fetchBlocksSaga(): Generator<any, void, any> {
  try {
    const res = yield call(apiGetBlocks);
    if (res?.data?.data) {
      yield put(actions.doFetchedBlocks(mapBlocks(res.data.data.blocks)));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error) {
    console.log('🚀 ~ function*fetchBlocksSaga ~ error:', error);
  }
}
export function* fetchBlockSaga({ payload }: PayloadAction<BlockQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiGetBlock, payload);
    if (res?.data?.data) {
      yield put(actions.doFetchedBlock(mapBlock(res.data.data)));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error) {
    console.log('🚀 ~ function*fetchBlockSaga ~ error:', error);
  }
}
export function* mineBlockSaga({
  payload,
}: PayloadAction<MineBlockQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiMineBlock, payload);
    if (res?.data?.data) {
      yield put(actions.doMinedBlock(res.data.data));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error) {
    console.log('🚀 ~ function*mineBlockSaga ~ error:', error);
  }
}
