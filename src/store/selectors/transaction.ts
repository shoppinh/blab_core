import { RootState } from 'types';
import { initialState } from 'store/slices/transaction';
const selectedDomain = (state: RootState) => state.transaction ?? initialState;
