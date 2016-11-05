'use strict'

import Router from 'koa-router'
import  * as FtpControllers from '../controllers/ftp'

const router = new Router()

router.post('/connect', (ctx, next) => {
  console.log('eeee')
  ctx.body = {
      "status": 200
  }
})


export default router
