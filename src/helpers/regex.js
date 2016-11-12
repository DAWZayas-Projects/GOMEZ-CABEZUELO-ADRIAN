

export const transformUrlIntoArrayPath = (url) => {
  const regex = /([a-zA-Z1-9\.]+)/g
  let arr = []
  let myArray;
  while ((myArray = regex.exec(url)) !== null) {
    if (myArray.index === regex.lastIndex) {
          regex.lastIndex++
      }
    arr = arr.concat(myArray[0])

  }

  return arr
}
