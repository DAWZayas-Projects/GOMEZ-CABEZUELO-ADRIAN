import Promise from "bluebird"
import fs from 'fs'


export const touch = (file) => {
  return new Promise((resolve, reject) => {
    fs.open(file, 'w', (err, handler) => {
      if(err) reject(err)
      resolve()
      })
    })
}

export const rm = (file) => {
  return new Promise((resolve, reject) => {
      fs.unlink(file, (err, handler) => {
      if(err) reject(err)
      resolve()
      })
    })
}


export const isDir = (path) => {
  return (path.indexOf('.') === -1)
}
