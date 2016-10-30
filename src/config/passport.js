'use strict';

import passport from 'koa-passport';
import UserModel from '../models/user';
import GooglePassport from 'passport-google-oauth';
import log4js from 'log4js';

const LOG = log4js.getLogger('file');

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    UserModel.findById(id)
      .then(user  => user !== null ? done(null, user) : done(500, user))
})

var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function(username, password, done) {

  UserModel.verify(username, password)
    .then(function(result) {
        if(result != null) {
            done(null, result)
        }  else {
            done(null, false)
        }
    })
}))

const GoogleStrategy = GooglePassport.OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: '933369426196-jgtcultj5hghn0hsucm58n3gevmpip1v.apps.googleusercontent.com',
    clientSecret: '4FK3X7XJkr0R3MDd5uUUBJef',
    callbackURL: 'http://localhost:' + (process.env.PORT || 5000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    
    done(null, profile)
  }
))
