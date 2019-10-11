const t = require("tap")
const fetchAndPoll = require("../index")
const mockServer = require("./mock-server")

const payload = {
  url: "https://mailchi.mp/c1e4a48fd5c5/perfectyourinterviewprep?dnt=1",
  cacheBust: true,
  opts: {
    social: true,
    brandProfile: true,
    brandOpts: {
      title: true,
      icons: true,
      // logos: true,
      siteColors: false,
      fonts: true,
      colorPairings: true,
      // marketing: true
    },
    fullProduct: false,
    product: false
  }
};

t.beforeEach(async (done, t) => {
  t.context.server = await mockServer.start()
  done()
})

t.afterEach(async (done, t) => {
  await mockServer.stop()
  done()
})

t.test('polling works', async t => {
  const url = "http://localhost:3000/begin"
  const pollUrl = id => `http://localhost:3000/check/${id}`

  const options = {
    url, 
    pollUrl,
    payload
  }

  const {data: {status}} = await fetchAndPoll(options)

  t.same(status, "done")
})