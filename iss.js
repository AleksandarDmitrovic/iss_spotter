const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  //use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error,response, body) => {
    if (error) {
      return callback(error, null);
      
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const myIP = JSON.parse(body)['ip'];
    callback(null, myIP);
    

  });
};

const fetchCoordsByIP = function(ip, callback) {
  //use request to fetch coordinates from JSON API
  request(`https://ipvigilante.com/` + ip, (error,response, body) => {
    if (error) {
      return callback(error, null);
      
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const myCoord = {                                           //Better way :  const { latitude, longitude } = JSON.parse(body).data;
      latitude: JSON.parse(body)['data']['latitude'],
      longitude: JSON.parse(body)['data']['longitude'],
    };
    callback(null, myCoord); // Better way { latitude, longitude}
    

  });
};

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

const fetchISSFlyOverTimes = function(coordinates, callback) {
  //use request to fetch fly over times for the ISS from NASA's JSON API
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}` , (error,response, body) => {
    if (error) {
      return callback(error, null);
      
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times for ISS: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body)['response'];
    
    callback(null, flyOverTimes);
    

  });
};
// http://api.open-notify.org/iss-pass.json?lat=49.83500&lon=-110.52030

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!");
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!");
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, flyTimes) => {
        if (error) {
          console.log("It didn't work!");
          return callback(error, null);
        }
        console.log(`Success here are the ISS Fly Over Times for your location: \n`);
        for (const fly of flyTimes) {
          const datetime = new Date(0);
          datetime.setUTCSeconds(fly.risetime);
          const duration = fly.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds! \n`);
          
        }
      });
    });
  });
  
};

module.exports = { nextISSTimesForMyLocation }; // fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,