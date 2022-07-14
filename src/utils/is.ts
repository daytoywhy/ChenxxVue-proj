
const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 
 * @param val 判断是否为数字
 * @returns 
 */
export function isNumber(val: unknown) {
  return is(val, 'Number')
}