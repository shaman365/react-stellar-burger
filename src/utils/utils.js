export function getIngredientById(array, id) {
    return array.length > 0 ? array.find(item => item._id === id) : null;
}