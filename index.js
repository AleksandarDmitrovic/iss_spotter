const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
  }

  console.log(passTimes);
});

//BETTER WAY TO LOG FLY OVER TIMES
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { printPassTimes };

//Previous Test Code
// // const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned IP: ${ip}`);
// });

// fetchCoordsByIP("70.73.235.67", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`Success here are my coordinates: ${data}`);
// });



// fetchISSFlyOverTimes({ latitude: '49.83500', longitude: '-110.52030' }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`Success here are the ISS Fly Over Times for your location: `,data);
// });



