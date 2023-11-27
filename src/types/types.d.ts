import { ThunkAction, TypedUseSelectorHook } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./services/store";
import { TAuthActions } from "./services/actions/auth";
import { TIngredientsActions } from "./services/actions/ingredients";
import { TWSActions } from "./services/actions/wsActions";

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
  ingredients: Array<string>,
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
  name?: string,
  email: string,
  password: string
};

// export type TUserRequest = {
//   name: string,
//   email: string,
//   token: string,
// };

// export type TProps = {
//   onDropHandler: (item: TIngredient) => void;
// };

//export type TIngredientWithProductId = TIngredient & { productId: string };

export type TMessage = {
  success: boolean,
  orders: [
    {
      ingredients: string[],
      _id: string,
      name: string,
      status: string,
      number: number,
      createdAt: Date,
      updatedAt: Date,
      price: number,
      __v: number,
    }
  ];
  total: number,
  totalToday: number,
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
}

// export type TError = {
//   success: boolean;
//   message?: string;
// };
