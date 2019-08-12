const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'index'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa json'
  }
})

module.exports = router