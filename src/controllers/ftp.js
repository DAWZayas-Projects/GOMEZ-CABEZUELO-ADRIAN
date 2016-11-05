'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'

const LOG = log4js.getLogger('file')


export const connectToFtp = (ctx, next) => {
  /*
  var ftp = new PromiseFtp();
  ftp.connect({host: host, user: user, password: password})
  .then(function (serverMessage) {
    console.log('Server message: '+serverMessage);
    return ftp.list('/');
  }).then(function (list) {
    console.log('Directory listing:');
    console.dir(list);
    return ftp.end();
  });
  */
  LOG.info('bieeeeen')

}
