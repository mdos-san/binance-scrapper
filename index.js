const BASE_URL = "https://api.binance.com";
const PATH = "/api/v3/klines";
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";
const LIMIT = "2";

const https = require("https");
const { setInterval } = require("timers");
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
const requestBinance = requestBinanceFactory(BASE_URL, PATH, SYMBOL, INTERVAL);

// Scrapper
let endTime = 0;

const main = async () => {
  const data = await requestBinance();
  endTime = data[0][0];
  print(data.reverse());
  loop();
}
main();

const loop = async () => {
  const data = await requestBinance(endTime);
  data.pop(); // last one correspond to the endtime that is already printed
  endTime = data[0][0];
  print(data.reverse());
  setTimeout(loop, 1000);
}

const print = (arr) => {
  arr.forEach((e) => {
    process.stdout.write(JSON.stringify(e) + "\n");
  });
}
