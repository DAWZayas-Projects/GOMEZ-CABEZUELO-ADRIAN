'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';

import RouterAuth from './auth';
import RouterFtp from './ftp';
import RouterHistory from './history';

const router = new Router();


router.get('/', async (ctx, next) => {
    await ctx.render('main')
})


router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
router.use('/ftp', RouterFtp.routes(), RouterFtp.allowedMethods())
router.use('/history', RouterHistory.routes(), RouterHistory.allowedMethods())

router.get('*', async (ctx, next) => {
    ctx.body = { status : 404 }
})

export default function routes() {
    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    )
}
