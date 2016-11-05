'use strict';

import Router from 'koa-router'
import passport from 'koa-passport'
import UserModel from '../models/user'
import log4js from 'log4js';

const LOG = log4js.getLogger('file');

const router = new Router()

router.get('/login', async (ctx, next) => {
    ctx.body = {
        "status" : "login page"
    }
})

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))


router.get('/google/callback', async (ctx, next) => {
  let middleware = passport.authenticate('google', async(profile, info) => {
      if (profile === false) {
          ctx.body = {
              "status" : 400
          }
      } else {
          const user = await UserModel.findByGoogleStrategy(await profile)
          await ctx.login(user)
          ctx.redirect('/')
      }
  })
  await middleware.call(this, ctx, next)
})

router.post('/login', async (ctx, next) => {
    let middleware = passport.authenticate('local', async(user, info) => {
        if (user === false) {
            ctx.body = {
                "status" : 400
            }
        } else {
            await ctx.login(user)
            ctx.body = {
                "user": user
            }
        }
    })
    await middleware.call(this, ctx, next)
})

router.post('/register', async(ctx, next) => {
    const userPassed = ctx.request.body
    const user = await UserModel.findOneByUserName(userPassed.username)
    if (!user) {
      const newUser = await UserModel.createNewUser(userPassed);
      await ctx.login(newUser)
      ctx.body = {
          "user": newUser
      }
    } else {
      ctx.body = {
          "status" : 400
      }
    }
})


router.get('/logout', async (ctx, newt) => {
    ctx.logout()
    ctx.redirect('/')
})

router.get('/status', async (ctx, next) => {
  const user = ctx.isAuthenticated() ? ctx.req.user : {}
  ctx.body = {
      "isLogin" : ctx.isAuthenticated(),
      "user"    : user,
  }
})

export default router;
