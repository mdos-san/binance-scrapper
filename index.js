const BASE_URL = "https://api.binance.com";
const PATH = "/api/v3/klines";
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";

const https = require("https");
const requestBinanceFactory = (baseUrl, path, symbol, interval) => () => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    url.searchParams.append("symbol", symbol);
    url.searchParams.append("interval", interval);

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

requestBinance().then(console.log).catch(console.error);

