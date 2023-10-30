export function getIngredientById(array, id) {
    return array.length > 0 ? array.find(item => item._id === id) : null;
}

export function getIngrediensCountWithIndexes(ingredient, array) {
    const count = array.reduce((total, item, index) => {
        if (item._id === ingredient._id) {
            total.count += 1
            total.indexes.push(index)
            return total
        }
        return total
    }, { count: 0, indexes: [] })

    return count
}

function isElementValid(array) {
    let result = true
    array.forEach(element => {
        if (!element) {
            result = false
        }
    })
    return result
}

export function getValidDataList(array) {
    return array.filter(item => {
        return isElementValid(item.ingredients)
    })
}

export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

export const getIngredientsDataFromStore = (state) => state.ingredientsData;
export const getIngredientsDetailsFromStore = (state) => state.ingredientsData.ingredients;
export const getUserDataFromStore = (state) => state.user;