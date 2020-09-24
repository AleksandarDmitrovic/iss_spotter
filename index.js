const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

fetchISSFlyOverTimes({ latitude: '49.83500', longitude: '-110.52030' }, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log(`Success here are the ISS Fly Over Times for your location: `,data);
});