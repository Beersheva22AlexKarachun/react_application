export function range(min, max) {
    return Array.from({ length: max - min })
        .map((__, index) => index + min)
}

export function countByField(array, field, interval) {
    const res = array.reduce((res, empl) => {
        const index = Math.trunc(empl[field] / interval);
        res[index] = (res[index] ?? 0) + 1;
        return res;
    }, {});
    return res;
}