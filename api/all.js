const got = require("got");
const assert = require("assert");

const { UPDOWN_API_KEY } = process.env;
assert(UPDOWN_API_KEY);

const metricsUrl = token => `https://updown.io/api/checks/${token}`;

module.exports = async (req, res) => {
  const searchParams = new URLSearchParams([["api-key", UPDOWN_API_KEY]]);

  const checks = await got("https://updown.io/api/checks", {
    searchParams
  }).json();

  searchParams.set("metrics", true);

  const checksWithMetrics = await Promise.all(
    checks.map(async check => ({
      ...check,
      ...(await got(metricsUrl(check.token), {
        searchParams
      }).json())
    }))
  );

  const checksWithNumbers = checksWithMetrics.map(check => {
    const copy = { ...check };

    for (const key in check) {
      if (typeof check[key] === "boolean") {
        copy[`${key}_value`] = Number(check[key]);
      }
    }

    return copy;
  });

  res.json(checksWithNumbers);
};
