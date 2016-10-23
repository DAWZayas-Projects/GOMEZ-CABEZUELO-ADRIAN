const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const router = require('koa-router')();
const kstatic = require('koa-static');
const convert = require('koa-convert');
const jade = require('koa-jade-render');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session');

const TIME_SESSION = 30 * 60 * 1000;
import Config from './config/mysql'; 


const app = new Koa();


app.key = ['is-a-secret'];

app.use(session({
	store: new MysqlStore(Config),
	rolling: true,
	cookie: {
		maxage: TIME_SESSION
	}
}));

app.use(jade('./views'));

// make a directory called "static" and link directly to the files inside there
// // use koa-convert to make it compatible with Koa v2.0
app.use(convert(kstatic(__dirname + '/static')));
//
// // read POST requests and cookies
app.use(bodyParser());
//
// // use common features to make uploads and downloads smaller
app.use(compression());
//
// // support different functions for different pages on the server

router.get('/', ctx => {
	ctx.render('index');
});

app.use(router.routes())
   .use(router.allowedMethods());
//
//   // start the server
app.listen(3000);
