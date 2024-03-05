import { RootState } from 'types';
import { initialState } from 'store/slices/block';
const selectedDomain = (state: RootState) => state.block ?? initialState;
