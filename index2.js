const { nextISSTimesForMyLocation,  } = require('./iss_promised');
const { printPassTimes }   = require('./index');

nextISSTimesForMyLocation()
.then( flyTimes => {})
.catch( error => {
  console.log("It didn't work: ", error.message);
});

//Better way by using a printing function
// nextISSTimesForMyLocation()
// .then( flyTimes => {
// printPassTimes(flyTimes);
// })