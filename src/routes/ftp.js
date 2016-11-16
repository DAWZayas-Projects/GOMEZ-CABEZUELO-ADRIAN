'use strict'

import Router from 'koa-router'
import  * as FtpControllers from '../controllers/ftp'
const multer = require('koa-multer')

const router = new Router()
const upload = multer({ dest: '../tmp/uploads/' })

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

router.post('/upload', async (ctx, next) => {



  console.log(ctx.request.body)

})

export default router
