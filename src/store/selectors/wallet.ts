import { RootState } from 'types';
import { initialState } from 'store/slices/wallet';
const selectedDomain = (state: RootState) => state.wallet ?? initialState;
