const BASE_URL = "https://api.binance.com";
const PATH = "/api/v3/klines";
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";

const requestBinance = require("./request-binance")(BASE_URL, PATH, SYMBOL, INTERVAL);

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
