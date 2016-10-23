
import compose from 'koa-compose'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import compression from 'koa-compress';
import kstatic from 'koa-static';
import jade  from 'koa-jade-render';
import csrf from 'koa-csrf';
import MysqlStore  from 'koa-mysql-session';

export default function middleware() {
  return compose([
    convert(bodyParser()),
    convert(kstatic(__dirname + '/static')),
    convert(compression()),
  
  ])
}
