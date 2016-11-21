'use strict'

import Router from 'koa-router'
import  * as FtpControllers from '../controllers/ftp'


const router = new Router()
const multer  = require('koa-multer');
const upload = multer({ dest: 'src/tmp/upload/'});


/** Permissible loading a single file,
    the value of the attribute "name" in the form of "recfile". **/
const type = upload.fields([{name: 'file'}, {name: 'host'}, {name: 'user'}, {name: 'passsword'}, {name: 'root'}]);

router.post('/connect', async (ctx, next) => {
  await FtpControllers.connectToFtp(ctx, next)
})

router.post('/create', async (ctx, next) => {
  await FtpControllers.createFileOrDirectory(ctx, next)
})

router.post('/delete', async (ctx, next) => {
  await FtpControllers.removeFileOrDirectory(ctx, next)
})

router.post('/move', async (ctx, next) => {
  await FtpControllers.moveFileOrDirectory(ctx, next)
})

router.post('/upload',type , async (ctx, next) => {
  await FtpControllers.uploadFile(ctx, next)
})

export default router
