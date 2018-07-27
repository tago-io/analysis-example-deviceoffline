const Analysis = require('tago/analysis');
const Device = require('tago/device');

// The function myAnalysis will run when you execute your analysis
async function myAnalysis(context, scope) {
  // Create a variable called payload with the value sent by the device
  const payload = scope[0].value;

  // Create separate the string into two hexadecimal values
  const hexTemp = `0x${payload.substring(0,4)}`;
  const hexHum = `0x${payload.substring(4,8)}`;

  // Convert the hex values into decimal and apply the calculations
  const temperature = Number(hexTemp) / 100;
  const humidity = Number(hexHum) / 10;

  // Create the two variables Temperature and Humidity to send to TagoIO
  const variables = [{
    variable: 'temperature',
    value: temperature,
    unit: 'C'
  }, {
    variable: 'humidity',
    value: humidity,
    unit: '%'
  }];

  // Instantiate the device with your device token
  const device = new Device('YOUR-DEVICE-TOKEN');

  // Insert the actual variables temperature and humidity to TagoIO
  await device.insert(variables).then(context.log).catch(context.log);
}

// The analysis token in only necessary to run the analysis outside Tago
module.exports = new Analysis(myAnalysis, 'YOUR-ANALYSIS-TOKEN');
