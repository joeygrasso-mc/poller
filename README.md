# Poller - the best thing since sliced bread

This is a simple little library that implements a fetch-and-poll procedure.

## Getting Started

`npm install @digitalscientists/poller` 

## Usage

```js

const fetchAndPoll = require("@digitalscientists/poller") 

const options = {
  url: "https://a-url-that-supports-polling.com/begin",
  pollUrl: (id) => `https://a-url-that-supports-polling.com/check/${id}`, // or whatever format
  wait: 2000, // how long to wait between polling (optional, defaults to 2 seconds)
  timeout: 120000, // how long to wait between polling (optional, defaults to 120 seconds)
  payload: {
    the: "payload",
    for: "the initial POST"
  }
}

const response = await fetchAndPoll(options)


```

## Deployment

*Make sure you run the tests before deploying*

`npm build`

`npm version patch # or major|minor depending on changes`

`npm publish`


## Development

`npm i`

`npm run debug:test`

Make sure you have [NiM](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj) installed in chrome for best results.

You can also run `npm link` if ya know what you're doing. This will let you install the local dev version in a separate app. Google that for more info.

## Tests

`npm test` 

This will run the rollup build process and test the main `index.js` file as well as the built lib files agaist a mock server. TODO: still need to test the UMD version, but need a browser env or something for that.


### current assumptions and limitations

The library currently assumes the following:

- the initial fetch will be a POST call
- the initial fetch will return something that looks like `{id: "somekindaideitherastringorinteger", status:"queued"}`
- subsequent polling will be GETs
- statuses for polling are: `queued`, `done`, and `errored`
- erroring jobs will not be retried
- everything is json. if you want xml, you're fired