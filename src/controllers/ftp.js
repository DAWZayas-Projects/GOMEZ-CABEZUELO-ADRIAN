'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'

const LOG = log4js.getLogger('file')


export const connectToFtp = async (ctx, next) => {
  const host     = ctx.request.body.host
  const user     = ctx.request.body.user
  const password = ctx.request.body.password
  const root     = ctx.request.body.root

  var ftp = new PromiseFtp();
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
               root
             }
             return ftp.end();
           })
           .catch( ex => {
             console.log('Error: ', ex )
             ctx.body = {
               status: 400,
               list: [],
               root: ''
             }
          })
}
