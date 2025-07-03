function uniqueByProperty(arr, prop) {
    const map = new Map();
    arr.forEach(item => {
        if (!map.has(item[prop])) {
            map.set(item[prop], item);
        }
    });
    return Array.from(map.values());
}

export {
    uniqueByProperty,
}