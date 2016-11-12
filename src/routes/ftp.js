'use strict'

import Router from 'koa-router'
import  * as FtpControllers from '../controllers/ftp'

const router = new Router()

router.post('/connect', async (ctx, next) => {
  await FtpControllers.connectToFtp(ctx, next)
})

router.post('/create', async (ctx, next) => {
  await FtpControllers.createFileOrDirectory(ctx, next)
})

router.post('/delete', async (ctx, next) => {
  await FtpControllers.removeFileOrDirectory(ctx, next)
})

export default router
