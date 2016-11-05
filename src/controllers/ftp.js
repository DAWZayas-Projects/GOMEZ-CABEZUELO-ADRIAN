'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'

const LOG = log4js.getLogger('file')


export const connectToFtp = async (ctx, next) => {
  const host     = ctx.request.body.host
  const user     = ctx.request.body.user
  const password = ctx.request.body.password

  var ftp = new PromiseFtp();
  await ftp.connect({host: host, user: user, password: password})
           .then( serverMessage => {
             console.log('Server message: ', serverMessage)
             return ftp.list('/')
           })
           .then( list => {
             console.log('Directory listing: ', list);
             ctx.body = {
               status: 200,
               list,
             }
             return ftp.end();
           })
           .catch( ex => {
             console.log('Error: ', ex )
             ctx.body = {
               status: 400,
              list: [],
             }
          })
}
