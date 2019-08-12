const Koa = require('koa');
const app = new Koa();
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var cors = require('koa2-cors');

const index = require('./routes/index')
// const users = require('./routes/users')
// const apis=require('./routes/api')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  app.use(json())
  app.use(logger())
//   app.use(require('koa-static')(__dirname + '/public'))
  app.use(cors())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

// routes
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
// app.use(apis.routes(),apis.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });


app.listen(3000);
