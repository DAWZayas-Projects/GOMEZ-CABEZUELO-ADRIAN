import passport from 'koa-passport'

export const renderLoginView        = async ctx         => await ctx.render('login')
export const renderRegisterView     = async ctx         => await ctx.render('register')
export const loginWithLocalStrategy = async (ctx, next) => {
  let middleware = passport.authenticate('local', async(user, info) => {
    if (!user) {
      ctx.render('login', { message: 'bad credencials'} )
    } else {
      await ctx.login(user)
      ctx.redirect(`/profile/${user.id}`)
    }
  })

  await middleware.call(this, ctx, next)

}
