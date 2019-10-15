const express = require('express')
const app = express()
const port = 3000

let checkCount = 0

app.post('/begin', (req, res) => res.json({ id: "fake-test-id-ahahahahaha", status: "queued" }))

app.get('/check/:id', (req, res) => {
  const { id } = req.params;
  checkCount++

  console.log("hit check");
  if (checkCount > 3) {
    return res.json({ id, status: "done" })
  }

  res.json({ id, status: "queued" })
})

let server;
const start = () => {
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
}

const stop = () => {
  server.close()
}
const reset = () => {
  checkCount = 0
}

module.exports = {start, stop, reset}