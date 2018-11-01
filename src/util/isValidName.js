/**
 * @name isValidName
 * @function isValidName
 * @description Tests a given string to see if it is a valid name by this
 * app's standards. This means that it must:
 * - be a string.
 * - have two (2) or more characters.
 * - not contain ONLY whitespace characters.
 * @param {String} name - The string to test.
 * @returns {Boolean} - Returns true if the string is a valid name. Otherwise,
 * it returns false.
 */
export default function isValidName(name) {
    if (typeof name === "string") {
        const strippedName = name.replace(/(\s+)/, "");
        if (strippedName.length > 1) {
            return true;
        }

        return false;
    }

    return false;
}
