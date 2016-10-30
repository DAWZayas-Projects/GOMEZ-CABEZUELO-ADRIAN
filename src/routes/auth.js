'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/login', async (ctx, next) => {
    ctx.body = {
        "status" : "login page"
    }
})

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))


router.get('/google/callback', async (ctx, next) => {
  let middleware = passport.authenticate('google', async(user, info) => {
      if (user === false) {
          ctx.body = {
              'status' : 400
          }
      } else {
          await ctx.login(user)
          ctx.body = {
              user: user
          }
          ctx.redirect('/')
      }
  })
  await middleware.call(this, ctx, next)
})

router.post('/login', async (ctx, next) => {
    let middleware = passport.authenticate('local', async(user, info) => {
        if (user === false) {
            ctx.body = {
                'status' : 400
            }
        } else {
            await ctx.login(user)
            ctx.body = {
                user: user
            }
        }
    })
    await middleware.call(this, ctx, next)
})


router.get('/logout', async (ctx, newt) => {
    ctx.logout()
    ctx.redirect('/')
})

router.get('/status', async (ctx, next) => {
    ctx.body = {
        "isLogin" : ctx.isAuthenticated()
    }
})

export default router;
