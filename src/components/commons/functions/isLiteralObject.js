//Checks if type is object
export function isLiteralObject(a) {
    return (!!a) && (a.constructor === Object);
}