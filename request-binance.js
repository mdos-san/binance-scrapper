const https = require("https");

const LIMIT = "1000";

const requestBinanceFactory = (baseUrl, path, symbol, interval) => (endTime) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    url.searchParams.append("symbol", symbol);
    url.searchParams.append("interval", interval);
    url.searchParams.append("limit", LIMIT);
    if (endTime) {
      url.searchParams.append("endTime", endTime);
    }

    const request = https.get(url, res => {
      let raw = "";

      res.on('data', d => {
	raw += d;
      });

      res.on('end', () => {
	resolve(JSON.parse(raw));
      });
    });

    request.on("error", reject);
    request.end();
  });
}

module.exports = requestBinanceFactory;
