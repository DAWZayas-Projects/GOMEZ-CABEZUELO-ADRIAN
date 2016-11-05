'use strict'

import Router from 'koa-router'
import  * as FtpControllers from '../controllers/ftp'

const router = new Router()

router.post('/connect', (ctx, next) => FtpControllers.connectToFtp(ctx, next))


export default router
