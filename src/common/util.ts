
function copyArray (source: Array<any>, array?: Array<any>) {
  let index = -1
  const length = source.length

  array || (array = new Array(length))
  while (++index < length) array[index] = source[index]
  return array
}

function shuffle (array: Array<any>) {
  const length = array == null ? 0 : array.length
  if (!length) return []
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

function randomNum (minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1)
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
    default:
      return 0
  }
}

export default { copyArray, shuffle, randomNum }
