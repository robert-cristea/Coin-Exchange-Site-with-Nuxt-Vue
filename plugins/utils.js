export function isEmptyObject(obj) {
  return JSON.stringify(obj) === JSON.stringify({})
}
