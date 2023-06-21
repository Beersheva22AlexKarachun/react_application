export function findCoefficients(point1: { x: number, y: number }, point2: { x: number, y: number }) {
    const epsilon = 1e-6;
    let a = 1;
    let b = 1;

    while (true) {
        const prevA = a;
        const prevB = b;

        a = (point1.y - point2.y) / (Math.log(point1.x) - Math.log(point2.x));
        b = point1.y - a * Math.log(point1.x);

        if (Math.abs(prevA - a) < epsilon && Math.abs(prevB - b) < epsilon) {
            break;
        }
    }

    return { a, b };
}

export function calculateLog(number: number, point1: { x: number, y: number }, point2: { x: number, y: number }): number {
    const { a, b } = findCoefficients(point1, point2)
    return a * Math.log(number) + b
}