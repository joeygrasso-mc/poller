# Poller - the best thing since sliced bread

This is a simple little library that implements a fetch-and-poll procedure.

## Getting Started

`npm install @digisci/poller` once we get this thing up on npm.

## Usage

```js

const fetchAndPoll = require("@digisci/poller") //or import once we get a build in place

const options = {
  url: "https://a-url-that-supports-polling.com/begin",
  pollUrl: (id) => `https://a-url-that-supports-polling.com/check/${id}`, // or whatever format
  payload: {
    the: "payload",
    for: "the initial POST"
  }
}

const response = await fetchAndPoll(options)


```


## Development

`npm i`
`npm run debug:test`

You can also run `npm link` if ya know what you're doing. This will let you install the local dev version in a separate app. Google that for more info.

## Tests

`npm test` 

There's just one test at the moment that spins up a mock server and hits it.


### current assumptions and limitations

The library currently assumes the following:

- the initial fetch will be a POST call
- the initial fetch will return someline that looks like `{id: "somekindaideitherastringorinteger", status:"queued"}`
- subsequent polling will be GETs
- statuses for polling are: `queued`, `done`, and `errored`
- erroring jobs will not be retried
- everything is json. if you want xml, you're fired