'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';


import RouterAuth from './auth';


const router = new Router();


router.get('/', async (ctx, next) => {
    await ctx.render('main')
})


router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())

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
