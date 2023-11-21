import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./services/store";
import { TAuthActions } from "./services/actions/auth";
import { TIngredientsActions } from "./services/actions/ingredients";
import { TWSActions } from "./services/actions/wsActions";

// type AppActions = TAuthActions | TIngredientsActions | TWSActions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<ReturnType = void> = ActionCreator<
//   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
// >;

export type THeader = {
  [key: string]: string | null;
};

export type TConfiguration = {
  baseUrl: string;
  ingredientsPath: string;
  orderPath: string;
  registerPath: string;
  loginPath: string;
  logoutPath: string;
  refreshTokenPath: string;
  forgotPath: string;
  resetPath: string;
  userPath: string;
  headers: THeader;
};

export type TOption = {
  method: string;
  body: any;
  headers: THeader;
};

export type TReponseToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  productId: string;
  count?: number;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
};

export type TUser = {
  name?: string;
  email: string;
  password: string;
};

export type TUserRequest = {
  name: string;
  email: string;
  token: string;
};

export type TProps = {
  onDropHandler: (item: TIngredient) => void;
};

export type TIngredientWithProductId = TIngredient & { productId: string };

export type TMessage = {
  success: boolean;
  orders: [
    {
      ingredients: string[];
      _id: string;
      name: string;
      status: string;
      number: number;
      createdAt: Date;
      updatedAt: Date;
      price: number;
      __v: number;
    }
  ];
  total: number;
  totalToday: number;
};

export type TError = {
  success: boolean;
  message?: string;
};
