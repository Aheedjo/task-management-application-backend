export const removeDuplicates = (arr1, arr2) => {
    const merged = arr1.slice();

    arr2.forEach(item => {
        const existingItem = merged.find(existing => existing.id === item.id);

        if (!existingItem) {
            merged.push(item);
        }
    });
      
    return merged;
}