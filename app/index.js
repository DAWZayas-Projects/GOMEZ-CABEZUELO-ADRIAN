import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import passport from 'koa-passport'
import users from './routes/users'
import auth from './routes/auth'
import profile from './routes/profile'
import middleware from './middleware'
import convert from 'koa-convert'
import jade  from 'koa-jade-render';

// Creates application and apply all routers to the app:
const app       = new Koa()

app.use(jade('./app/views'));

// trust proxy
app.proxy = true
// sessions
app.keys = ['your-session-secret']

// authentication
require('./auth/auth')
app.use(passport.initialize())
app.use(passport.session())

app
  .use(middleware())
  .use(convert(serve(__dirname + '/public'))) // for static files like images

  const api           = new Router({
                          prefix: '/api'
                        })

  const profileRoutes = new Router()
  const authRoutes    = new Router()

  profileRoutes
    .use('/profile', profile.routes())

  authRoutes
    .use('/auth', auth.routes())

  api
    .use('/users', users.routes())

  app
    .use(profileRoutes.routes())
    .use(authRoutes.routes())
    .use(api.routes()) // Important: routes before middleware!
    .use(authRoutes.allowedMethods())
    .use(api.allowedMethods())


export default app
