'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';


import RouterMain from './main';


const router = new Router();


router.get('/', async (ctx, next) => {
    await ctx.render('main')
})


//router.use('/api',  RouterMain.routes(), RouterMain.allowedMethods())
//router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
//router.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods())
//router.use('/mock', RouterMock.routes(), RouterMock.allowedMethods())

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
