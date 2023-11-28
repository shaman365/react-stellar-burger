import { ThunkAction, TypedUseSelectorHook } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./services/store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type TConfiguration = {
  baseUrl: string,
  ingredientsPath: string,
  orderPath: string,
  registerPath: string,
  loginPath: string,
  logoutPath: string,
  refreshTokenPath: string,
  forgotPath: string,
  resetPath: string,
  userPath: string,
  headers: HeadersInit,
};

export type TReponseToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string
};

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v?: number,
  productId: string,
  count?: number,
  key?: string
};

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  price: number,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  owner?: {
    createdAt: Date,
    updatedAt: Date,
    email: string,
    name: string,
  },
  __v: number
};

export type TOrderData = {
  name: string;
  order: {
    number: number | null;
  };
  success: boolean;
  status: string;
};

export type TBurgerData = {
  bun: TIngredient[],
  ingredients: TIngredient[]
};

export type TUser = {
  login: string,
  name: string,
  email: string,  
};

export type TUserData = {
  user: TUser | null,
  isAuthChecked: boolean,
  status: string,
};

export type TUserLoginRequest = {
  success: boolean,
  user: TUser,
  accessToken: string,
  refreshToken: string
};

export type TUserLogoutRequest = {
  success: boolean,
  message: string
};

export type TUserInfoRequest = {
  success: boolean,
  user: TUser
};

export type TUserUpdateData = {
  name: string, 
  password: string,
  email: string
};


export type TAsyncThunkConfig = {
  state?: RootState,
  dispatch?: AppDispatch,
  rejectValue?: Error
};

export type TSortIngredientsPayload = {
  dragIndex: number,
  dropIndex: number
};

export type TIngredientProps = {
  ingredientData: TIngredient
};

export type TBurgerData = {
  bun: IngredientType[],
  ingredients: IngredientType[]
};

export type TIngredientDetailsProps = {
  isFullScreen: boolean
};

export type TModalProps = {
  children?: ReactElement,
  onClose: () => void  
};

export type TOrderProps = {
  order: TOrder
};

export type TOrderRequest = {
  success: boolean,
  orders: TOrder[]
};

export type TWSData = {
  success: boolean,
  orders: TOrder[],
  total: number | null,
  totalToday: number | null,
  socketConnectionStatus: string | null
}

export type TWSPayload = {
  success: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number,
}


// export type TError = {
//   success: boolean;
//   message?: string;
// };
