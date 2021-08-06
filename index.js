const BASE_URL = "https://api.binance.com";
const PATH = "/api/v3/klines";
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";

const https = require("https");
const url = new URL(PATH, BASE_URL);
url.searchParams.append("symbol", SYMBOL);
url.searchParams.append("interval", INTERVAL);

const request = https.get(url, res => {
  let raw = "";

  res.on('data', d => {
    raw += d;
  });

  res.on('end', () => {
    console.log(raw);
  });
});

request.on("error", console.error);
request.end();

