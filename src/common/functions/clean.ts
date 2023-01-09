/**
 * Removes all keys with falsy values from an object.
 *
 * @param {Object} [obj={}] - The object to clean.
 * @return {Object} The cleaned object.
 */
export function clean(obj: { [key: string]: any } = {}): { [key: string]: any } {
    for (const propName in obj) {
        if (!obj[propName]) {
            delete obj[propName];
        }
    }
    return obj;
}



// exports.objectFilter = (object) => {
//     if (!object instanceof Object || [null, undefined].includes(object)) {
//       return null;
//     }
//     let newObject = {};
//     let keys = Object.keys(object);
//     for (let index = 0; index < keys.length; index++) {
//       const key = keys[index];
  
//       if (
//         typeof object[key] === "boolean" ||
//         (object[key] !== null && object[key] !== undefined && object[key] !== "")
//       ) {
//         newObject[key] = object[key];
//       }
//     }
//     return newObject;
//   };
  
/**
 * Filters an object and returns a new object containing only the key-value pairs
 * where the value is a boolean or non-empty string.
 * 
 * @param object - The object to filter
 * @returns A new object containing the filtered key-value pairs, or null if the input is invalid
 */
export function objectFilter(object: any): any | null {
    if (!(object instanceof Object)) {
        return null;
    }
    const newObject: any = {};
    for (const key of Object.keys(object)) {
        if (typeof object[key] === "boolean" || (object[key] !== null && object[key] !== undefined && object[key] !== "")) {
            newObject[key] = object[key];
        }
    }
    return newObject;
}
