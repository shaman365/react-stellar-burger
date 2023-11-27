import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { RootState, AppDispatch } from "./types";

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
