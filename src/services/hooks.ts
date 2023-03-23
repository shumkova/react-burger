import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TAppThunk, TRootState } from './types';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;