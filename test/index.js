const t = require("tap")
const fetchAndPoll = require("../index")
const fetchAndPollUMD = require("../dist/fetch-and-poll.umd")
const fetchAndPollCJS = require("../dist/fetch-and-poll.cjs")
const fetchAndPollESM = require("../dist/fetch-and-poll.esm")
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

mockServer.start()
t.afterEach((done, t) => {
  mockServer.reset()
  done()
})

t.teardown(async (done, t) => {
  await mockServer.stop()
})

const testFn = async fn => {
  const url = "http://localhost:3000/begin"
  const pollUrl = id => `http://localhost:3000/check/${id}`

  const options = {
    url, 
    pollUrl,
    payload,
    wait: 500
  }

  const {data: {status}} = await fn(options)

  t.same(status, "done")
}

t.test('polling works', async t => {
  await testFn(fetchAndPoll)
})

t.test('esm build works', async t => {
  await testFn(fetchAndPollESM)
})
t.test('cjs build works', async t => {
  await testFn(fetchAndPollCJS)
})
t.test('umd build works', async t => {
  await testFn(fetchAndPollUMD)
})

// t.test('polling exits early when data is returned immediately', async t => {
//   const url = "http://localhost:3000/begin"
//   const pollUrl = id => {
//     throw Error("polling did not exit early if this is thrown")
//   }

//   const options = {
//     url, 
//     pollUrl,
//     payload
//   }

//   const {data: {status}} = await fetchAndPoll(options)

//   t.same(status, "done")
// })