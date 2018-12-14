const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'blueStone!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'blueStone Club'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
