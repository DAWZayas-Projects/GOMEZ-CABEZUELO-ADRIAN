
import  * as User  from '../models/user'

let router = require('koa-router')();

router
  .get('/:id', async (ctx, next) => {
    const user = await User.findUserById(ctx.params.id)
    console.log(user);
    ctx.render('profile', {'user': user.dataValues})
  })

module.exports = router;
