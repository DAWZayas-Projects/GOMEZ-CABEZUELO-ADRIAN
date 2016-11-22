'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'
import {touch, rm, isDir, rename} from '../helpers/files'
import {transformUrlIntoArrayPath} from '../helpers/regex'
import {takeLastValueOfArray, removeLasValueOfArray, PromiseAllReturnedValues} from '../helpers/functions'
import History from '../models/ftpHistory'

const LOG = log4js.getLogger('file')


export const connectToFtp = (ctx, next, message = false) => {
  const host = ctx.request.body.host
  const user = ctx.request.body.user
  const password = ctx.request.body.password
  const root = ctx.request.body.root
  const ftp = new PromiseFtp();

  return ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
    .then(serverMessage => {
      console.log('Server message: ', serverMessage)
      console.log(root)
      return ftp.list(root)
    })
    .then(list => {
      console.log('Directory listing: ', list);
      ctx.body = {
        status: 200,
        list,
        root,
        message: (message) ? message : 'Connection success',
      }
      return ftp.end();
    })
    .catch(ex => {
      console.log('Error: ', ex)
      ctx.body = {
        status: 400,
        list: [],
        root: '',
        message: 'Error connection'
      }
    })
}

export const moveFileOrDirectory = async (ctx, next) => {

  const pathNewDirOrFile = ctx.request.body.newDirOrFile
  const movePromise      = move(ctx, next)
  const rootReturned     = await PromiseAllReturnedValues([ pathNewDirOrFile, movePromise ], 0)

  const host   = ctx.request.body.host
  const user   = ctx.request.body.user
  const userId = ctx.req.user.dataValues.id
  if(rootReturned) await History.createNewFtpHistory ({host, user, root: pathNewDirOrFile, action: 'MOVE/RENAME'}, userId)

  ctx.body = {
    status:  (rootReturned) ? 200 : 500,
    root:    pathNewDirOrFile,
    message: (rootReturned) ? 'Rename success' : 'Rename error'
  }
}


const move = (ctx, next) => {

  const host = ctx.request.body.host
  const user = ctx.request.body.user
  const password = ctx.request.body.password
  const root = ctx.request.body.root
  const ftp = new PromiseFtp()
  const pathNewDirOrFile = ctx.request.body.newDirOrFile

  return ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
    .then(serverMessage => {
      return ftp.rename(root, pathNewDirOrFile)
    })
    .then(_ => {
      return ftp.end()
    })
    .catch(err => {
      throw err
    })
}

export const removeFileOrDirectory = async(ctx, next) => {

  const host = ctx.request.body.host
  const user = ctx.request.body.user
  const password = ctx.request.body.password
  const root = ctx.request.body.root
  const ftp = new PromiseFtp()

  const promise = ftp.connect({host: host, user: user, password: password})
    .then(function (serverMessage) {
      if (isDir(takeLastValueOfArray(transformUrlIntoArrayPath(root)))) {
        return ftp.rmdir(root, true)
      } else {
        return ftp.delete(root)
      }
    })
    .then(function () {
      return ftp.end()
    })
    .catch( err => {
      throw err
    })

  const pathInFtp = '/' + removeLasValueOfArray(transformUrlIntoArrayPath(root)).join('/')

  const rootReturned = await PromiseAllReturnedValues([ pathInFtp ,promise], 0)

  const userId = ctx.req.user.dataValues.id
  if(rootReturned) await History.createNewFtpHistory ({host, user, root, action: 'DELETE'}, userId)

  ctx.body = {
    status: (rootReturned) ? 200 : 500,
    root: pathInFtp,
    message: (rootReturned) ? 'Delete success' : 'Delete error'
  }
}

export const createFileOrDirectory = async(ctx, next) => {

  const nameFileOrDir = ctx.request.body.newDirOrFile

  if (nameFileOrDir.length <= 0) {
    ctx.body = {
      status: 400,
      root: root,
      message: 'Error no pass name'
    }
  }

  const pathInFtp = (!isDir(nameFileOrDir)) ? await createFile(ctx, next) : await createDir(ctx, next)
  const host   = ctx.request.body.host
  const user   = ctx.request.body.user
  const userId = ctx.req.user.dataValues.id
  const root   = ctx.request.body.root + '/' + ctx.request.body.newDirOrFile

  if(pathInFtp) await History.createNewFtpHistory ({host, user, root, action: 'CREATE'}, userId)

  ctx.body = {
    status: (pathInFtp) ? 200 : 500,
    root: pathInFtp,
    message: (pathInFtp) ? 'Create success' : 'Create error'
  }

}

const createDir = (ctx, next) => {

  const nameDir = ctx.request.body.newDirOrFile
  const host = ctx.request.body.host
  const user = ctx.request.body.user
  const password = ctx.request.body.password
  const root = ctx.request.body.root
  const ftp = new PromiseFtp()
  const pathPromise = root + '/' + nameDir

  const createPromise = ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
    .then(serverMessage => {
      return ftp.mkdir(root + '/' + nameDir)
    })
    .then(_ => {
      return ftp.end()
    })
    .catch(err => {
      throw err
    })

  return PromiseAllReturnedValues([pathPromise, createPromise], 0)

}

const createFile = async(ctx, next) => {

  const nameFile = ctx.request.body.newDirOrFile
  const touchPromise = touch('src/tmp/' + nameFile)
  const uploadPromise = uploadToFtp({
                                      host: ctx.request.body.host,
                                      user: ctx.request.body.user,
                                      password: ctx.request.body.password,
                                      root: ctx.request.body.root,
                                      }, next, 'src/tmp/' + nameFile)
  const pathPromise = ctx.request.body.root + '/' + nameFile
  const rmPromise = rm('src/tmp/' + nameFile)

  return PromiseAllReturnedValues([pathPromise, touchPromise, uploadPromise, rmPromise], 0)

}

export const uploadFile = async (ctx, next) => {
console.log(ctx.req)
  const { file } = ctx.req.files
  const { host, user, password, root } = ctx.req.body
  const tmpPath = file[0].path
  const newPath = file[0].destination + file[0].originalname
  const objFtp  = {
    host,
    user,
    password,
    root
  }
  try {
    const renamePrommise =  rename(tmpPath, newPath)
    await PromiseAllReturnedValues([renamePrommise, uploadToFtp(objFtp, next, newPath)])
  } catch (e) {
    throw e
  }

}


export const uploadToFtp = (obj, next, rootLocalFile = false) => {

  const host      = obj.host
  const user      = obj.user
  const password  = obj.password
  const root      = obj.root
  const ftp       = new PromiseFtp()
  const rootFile  = rootLocalFile // when no nameFile upload the file in ctx ... no implement yet
  const pathInFtp = root + '/' + takeLastValueOfArray(transformUrlIntoArrayPath(rootFile))

  return ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
    .then(serverMessage => {
      return ftp.put(rootFile, pathInFtp)
    })
    .then(_ => {
      return ftp.end()
    })
    .catch(err => {
      throw err
    })

}
