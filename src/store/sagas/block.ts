import { all, call, put, takeLatest } from 'redux-saga/effects';
import { blockActions as actions } from '../slices/block';
import { apiGetBlock, apiGetBlocks, apiMineBlock } from 'services/api/apiHelper';
import { PayloadAction } from '@reduxjs/toolkit';
import { BlockQuery, MineBlockQuery } from 'types/Block';
export function* blockSaga() {
  yield all([
    takeLatest(actions.doFetchBlocks, fetchBlocksSaga),
    takeLatest(actions.doFetchBlock, fetchBlockSaga),
    takeLatest(actions.doMineBlock, mineBlockSaga),
  ]);
}

export function* fetchBlocksSaga(): Generator<any, void, any> {
  try {
    const res = yield call(apiGetBlocks);
    if (res?.data) {
      yield put(actions.doFetchedBlocks(res.data));
    } else {
      yield put(actions.Error('Error fetching blocks'));
    }
  } catch (error) {
    console.log('🚀 ~ function*fetchBlocksSaga ~ error:', error);
  }
}
export function* fetchBlockSaga({ payload }: PayloadAction<BlockQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiGetBlock, payload);
    if (res?.data) {
      yield put(actions.doFetchedBlock(res.data));
    } else {
      yield put(actions.Error('Error fetching block'));
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
    if (res?.data) {
      yield put(actions.doMinedBlock(res.data));
    } else {
      yield put(actions.Error('Error mining block'));
    }
  } catch (error) {
    console.log('🚀 ~ function*mineBlockSaga ~ error:', error);
  }
}
