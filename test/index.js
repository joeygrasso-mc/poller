const t = require("tap")
const fetchAndPoll = require("../index")

const magpieOptions = {
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

t.test('polling works', async t => {
  const results = await fetchAndPoll(magpieOptions)
  t.same(results.status, "done")
})