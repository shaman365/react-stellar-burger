import { number } from "prop-types";
import type { RootState, TIngredient, TOrder } from "../types/types";

export function getIngredientById(array: TIngredient[], id: string) {
  return array.length > 0 ? array.find((item) => item._id === id) : null;
}

export function getIngrediensCountWithIndexes(
  ingredient: TIngredient,
  array: TIngredient[]
) {
  const count = array.reduce(
    (
      total: { count: number; indexes: number[] },
      item: TIngredient,
      index: number
    ) => {
      if (item._id === ingredient._id) {
        total.count += 1;
        total.indexes.push(index);
        return total;
      }
      return total;
    },
    { count: 0, indexes: [] }
  );

  return count;
}

function isElementValid(array: string[]): boolean {
  let result = true;
  array.forEach((element) => {
    if (!element) {
      result = false;
    }
  });
  return result;
}

export function getValidDataList(array: TOrder[]) {
  return array.filter((item) => {
    return isElementValid(item.ingredients);
  });
}

export function isEmptyObj(obj: {}): boolean {
  return Object.keys(obj).length === 0;
}

export const getIngredientsDataFromStore = (state: RootState) =>
  state.ingredientsData;
export const getIngredientsDetailsFromStore = (state: RootState) =>
  state.ingredientsData.ingredients;
export const getUserDataFromStore = (state: RootState) => state.user;
