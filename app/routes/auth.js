
import * as User           from '../models/user'
import * as AuthController from '../controllers/authController'

let router = require('koa-router')();

router
  .get('/login', ctx                => AuthController.renderLoginView(ctx))
  .post('/login', async (ctx, next) => AuthController.loginWithLocalStrategy(ctx,next))
  .get('/register', ctx             => AuthController.renderRegisterView(ctx))
  .post('/register', (ctx, next)    =>
    ctx.body = 'You are traying to register but is not implement yet')


module.exports = router;
