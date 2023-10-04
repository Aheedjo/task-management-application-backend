export const removeDuplicates = (arr1, arr2) => {
    const merged = [...new Set(Array.from((arr1.map(id => id.toString())).concat(arr2)))]
    return merged;
}