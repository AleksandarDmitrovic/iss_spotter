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


module.exports = { fetchMyIP, fetchCoordsByIP };