/**
 * @name hasMinimumLength
 * @function hasMinimumLength
 * @param {String} str - a string to test if it has the minimum length.
 * @param {Number} minLength - the minimum string length desired.
 * @returns {Boolean} - returns true if the string has the minimum length
 * and false if otherwise.
 */
export default function hasMinimumLength(str, minLength) {
    if (typeof str !== "string") return false;

    const strWithoutWhitespace = str.replace(/\s+/, "");
    return strWithoutWhitespace.length >= minLength;
}
