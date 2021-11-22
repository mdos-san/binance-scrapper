/*
 * Usage:
 * $> node index.js <number-of-candles> > btcusdt.json
 */
const args = process.argv.slice(2);

const NUMBER_OF_CANDLES = args[0];
const BASE_URL = "https://api.binance.com";
const PATH = "/api/v3/klines";
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";


const requestBinance = require("./request-binance")(
  BASE_URL,
  PATH,
  SYMBOL,
  INTERVAL
);

// Scrapper
const cache = []; // Will be used to store all fetched candles
let endTime = 0;

const loop = async () => {
  const candles = await requestBinance(endTime);

  // When end time is set, last element correspond to previously fetched candle
  // We remove it to prevent duplication
  if (endTime !== 0) {
    candles.pop();
  }

  endTime = candles[0][0]; // Set the new endTime
  cache.push(...candles.reverse()); 

  if (cache.length < NUMBER_OF_CANDLES) {
    setTimeout(loop, 70); // Repeat after 70ms delay to respect quota
  } else {
    console.log(JSON.stringify(cache.reverse()));
  }
};
loop();

