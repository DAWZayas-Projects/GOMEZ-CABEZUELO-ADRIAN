

export const takeLastValueOfArray = (arr) => {
  return arr[arr.length - 1]
}

export const removeLasValueOfArray = (arr) => {
  return arr.slice(0, arr.length - 1)
}

export const PromiseAllReturnedValues = (arrPromises, index = null) => {
  return Promise.all(arrPromises)
    .then( values => {
      return index ? values[index] : values
    })
    .catch( reason => console.error(reason))
}