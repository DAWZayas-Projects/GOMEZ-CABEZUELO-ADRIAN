
import  * as User  from '../models/user'

let router = require('koa-router')();

router
  .get('/', async ctx => ctx.body = await User.getAllUsers())
  .post('/', async (ctx, next) =>
    ctx.body = await User.createUser(ctx.request.body))
  // Routes to /locations/id.
  .get('/:id', async (ctx, next) =>
    ctx.body = await User.findUserById(ctx.params.id))
  // PUT to a single location.
  .put('/:id', async (ctx, next) =>
    ctx.body = await User.updateUser(ctx.params.id, ctx.body))
  // DELETE to a single location.
  .delete('/:id', async (ctx, next) =>
    ctx.body = await User.removeUser(ctx.params.id))

module.exports = router;
