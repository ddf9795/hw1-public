/**
 * Given the items: string[], returns a random item from within that array.
 * Does not modify the array.
 * 
 * @param items - a string[] as items to choose from
 * @returns a random item selected from items
 */
export const getRandomItemFrom = (items: string[]): string => {
  // Consult https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
  // In particular ... you might find Math.random() and Math.floor() useful.
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

// `: string[]` and `: string` are TypeScript type annotations.
// They tell us:
// - that `items` must be an array of strings
// - that `getRandomItemFrom` will return a string
//
// Uncomment the next line to see an error:
// getRandomItemFrom([1, 2, 3])
//
// We'll get a warning if we call it with bad inputs.
// (at least, until we figure out how to write it again but with Generics)
// (yes, TypeScript lets us use Generics in our web code!)
