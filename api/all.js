const got = require("got");
const assert = require("assert");

const { UPDOWN_API_KEY } = process.env;
assert(UPDOWN_API_KEY);

const metricsUrl = token => `https://updown.io/api/checks/${token}/metrics`;

module.exports = async (req, res) => {
  const searchParams = new URLSearchParams([["api-key", UPDOWN_API_KEY]]);

  const checks = await got("https://updown.io/api/checks", {
    searchParams
  }).json();

  const oneDayAgo = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toUTCString();

  searchParams.set("from", oneDayAgo);

  const checksWithMetrics = await Promise.all(
    checks.map(async check => ({
      ...check,
      ...(await got(metricsUrl(check.token), {
        searchParams
      }).json())
    }))
  );

  res.json(checksWithMetrics);
};
