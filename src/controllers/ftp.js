'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'
import { touch, rm } from '../helpers/files'

const LOG = log4js.getLogger('file')


export const connectToFtp = async (ctx, next, message = false) => {
  const host     = ctx.request.body.host
  const user     = ctx.request.body.user
  const password = ctx.request.body.password
  const root     = ctx.request.body.root
  const ftp      = new PromiseFtp();

  await ftp.connect({host: host, user: user, password: password})
           .then( serverMessage => {
             console.log('Server message: ', serverMessage)
             console.log(root)
             return ftp.list(root)
           })
           .then( list => {
             console.log('Directory listing: ', list);
             ctx.body = {
               status: 200,
               list,
               root,
               message: (message) ? message : 'Connection success',
             }
             return ftp.end();
           })
           .catch( ex => {
             console.log('Error: ', ex )
             ctx.body = {
               status: 400,
               list: [],
               root: '',
               message: 'Error conection'
             }
          })
}



export const createFileOrDirectory = async (ctx, next) => {

    const nameFileOrDir = ctx.request.body.newDirOrFile

    if (nameFileOrDir.length <= 0)
        ctx.body = {
            status: 400,
            list:   [],
            root:   root,
            message: 'Error no pass name'
        }

    if(nameFileOrDir.indexOf('.') !== -1) {
      await createFile(ctx, next)
    } else {
      await createDir(ctx, next)
    }

    await connectToFtp(ctx, next, "Created success")
}

const createDir = async (ctx, next) => {

  const nameDir  = ctx.request.body.newDirOrFile
  const host     = ctx.request.body.host
  const user     = ctx.request.body.user
  const password = ctx.request.body.password
  const root     = ctx.request.body.root
  const ftp      = new PromiseFtp()

  ftp.connect({host: host, user: user, password: password})
  .then(function (serverMessage) {
    return ftp.mkdir(root + '/' + nameDir)
  }).then(function () {
    return ftp.end()
  })

}

const createFile = async (ctx, next) => {

  const nameFile = ctx.request.body.newDirOrFile

  try {
    await touch('src/tmp/' + nameFile)
  } catch (err) {
    throw err;
  }

  await uploadToFtp(ctx, next, nameFile)

  try {
    await rm('src/tmp/' + nameFile)
  } catch (err) {
    throw err
  }
   
}


export const uploadToFtp = async (ctx, next, nameFile = false) => {

    const host     = ctx.request.body.host
    const user     = ctx.request.body.user
    const password = ctx.request.body.password
    const root     = ctx.request.body.root
    const ftp      = new PromiseFtp()
    const file     = root + '/' + nameFile // when no nameFile upload the file in ctx ... no implement yet

    ftp.connect({host: host, user: user, password: password})
    .then(function (serverMessage) {
      return ftp.put(file, file)
    }).then(function () {
      return ftp.end()
    })
}
