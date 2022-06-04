export function sortArrayObjectByKey(array, key, asc = true) {
    return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        if (asc)
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
