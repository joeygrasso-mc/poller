const axios = require("axios")

const defaultOptions = {
  wait: 2000
}

const beginJob = async (url, payload) => {
    const response = await axios.post(url, payload)
    const { data: { id, status } } = response;
    
    if (status == "done") return [id, response]

    return [id, false]
}

async function* poll(url) {
  while (true) {
    console.log("polling url: " + url)
    const response = await axios.get(url)

    yield response
  }
}

const fetchAndPoll = async options => {
  // start the job and get the id
  const { url, pollUrl, payload, wait } = {...defaultOptions, ...options};
  const [jobId, data] = await beginJob(url, payload);

  if (data) return data; // data was retrieved from cache, no polling needed

  const urlToPoll = pollUrl(jobId)

  // begin polling
  for await (const attempt of poll(urlToPoll)) {
    const { data: { status } } = attempt

    if (status == "done") return attempt.data
    // also need to catch or abort jobs here that errored

    await new Promise(resolve => setTimeout(resolve, wait)) // wait however long, defaults to 2 seconds
  }
}

module.exports = fetchAndPoll