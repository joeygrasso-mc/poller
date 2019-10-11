const axios = require("axios")

const beginJob = async (url, payload) => {
  console.log("initial fetch happening");
  try {
    const response = await axios.post(url, payload)
    // debugger

    const { data: { id, status } } = response;

    return id
  } catch (error) {
    console.log("error occured, abort polling");
  }
}

async function* poll(url) {
  while (true) {
    console.log("polling url: "+url)
    const response = await axios.get(url)

    yield response
  }
}

const fetchAndPoll = async options => {
  // start the job and get the id
  const {url, pollUrl, payload} = options;
  const jobId = await beginJob(url, payload);

  const urlToPoll = pollUrl(jobId)

  // begin polling
  for await (const attempt of poll(urlToPoll)) {
    const { data: { status } } = attempt

    if (status == "done") return attempt
    // also need to catch or abort jobs here that errored

    await new Promise(resolve => setTimeout(resolve, 2000)) // wait 2 seconds
  }
}

module.exports = fetchAndPoll