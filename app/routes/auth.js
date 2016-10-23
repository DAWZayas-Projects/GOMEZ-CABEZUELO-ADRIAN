
import  * as User  from '../models/user'

let router = require('koa-router')();

router
  .get('/login', ctx => ctx.render('login') )
  .post('/login', (ctx, next) =>
    ctx.body = 'You are traying to login but is not implement yet')
  .get('/register',  ctx => ctx.render('register') )
  .post('/register', (ctx, next) =>
    ctx.body = 'You are traying to register but is not implement yet')


module.exports = router;
