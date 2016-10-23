import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import passport from 'koa-passport'
import users from './routes/users'
import auth from './routes/auth'
import middleware from './middleware'
import convert from 'koa-convert'
import jade  from 'koa-jade-render';

// Creates application and apply all routers to the app:
const app       = new Koa()

app.use(jade('./app/views'));

const api       = new Router({
                    prefix: '/api'
                  })
const authRoute = new Router()

authRoute
        .use('/auth', auth.routes())

api
  .use('/users', users.routes())

app
  .use(authRoute.routes())
  .use(api.routes()) // Important: routes before middleware!
  .use(authRoute.allowedMethods())
  .use(api.allowedMethods())

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


export default app
