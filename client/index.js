const fs = require('fs');
const path = require('path');
const speedTest = require('speedtest-net');

const TIMES = {
  ONE_MINUTE: 60 * 1000,
  TEN_SECONDS: 10 * 1000,
  FIVE_SECONDS: 5 * 1000,
};

const RUNS = 1;

plot({
  data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
  filename:	'output.png'
});

(async function() {
  console.log('Running...');
  for (let run=1; run<=RUNS; run++) {
    console.log(run);
    await runTest();
    console.log(run + ' done!');
  }
});

function runTest() {
  return new Promise((resolve, reject) => {
    const test = speedTest({ maxTime: TIMES.FIVE_SECONDS });
    test.on('data', data => {
      resolve(saveData(data.speeds.upload, data.speeds.download));
    });
    test.on('error', err => {
      reject(err);
    });
  }) 
}

function saveData(upSpeed, downSpeed) {
  const now = new Date();
  const dataFile = path.join(__dirname, 'data.csv');
  const prefix = fs.existsSync(dataFile) ? '' : 'Time,Upload speed,Download speed\n'
  const line = `${prefix}${now.getTime()},${upSpeed},${downSpeed}\n`;
  return new Promise((resolve, reject) => {
    fs.appendFile(dataFile, line, function (err) {
      if(err) throw err;
      resolve();
    });
  });
}
