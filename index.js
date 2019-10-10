const axios = require("axios")

const beginJob = async options => {
  // const {url} = options;
  debugger
  console.log("initial fetch happening");
  try {
    const response = await axios.post(`http://8aeb9b7c.ngrok.io/v1/scrape`, magpieOptions)
    // debugger

    const { data: { id, status } } = response;

    return id
  } catch (error) {
    console.log("error occured, abort polling");
  }
}

async function* poll(jobId) {
  while (true) {
    console.log("polling jobID: " + jobId);
    const response = await axios.get(`http://8aeb9b7c.ngrok.io/v1/scrape/${jobId}`)

    yield response
  }
}

const fetchAndPoll = async options => {
  // start the job and get the id
  const jobId = await beginJob(options);

  // begin polling
  for await (const attempt of poll(jobId, options)) {
    const { data: { status } } = attempt

    if (status == "done") return attempt
    // also need to catch or abort jobs here that errored

    await new Promise(resolve => setTimeout(resolve, 2000)) // wait 2 seconds
  }
}

module.exports = fetchAndPoll