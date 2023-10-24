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