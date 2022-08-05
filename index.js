// Fetch our IP Address
// Fetch the geo coordinates (Latitude & Longitude) for our IP
// Fetch the next ISS flyovers for our geo coordinates

// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
// Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
// Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error1, ip) => {
  if (error1) {
    console.log("It didn't work!" , error1);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned Data:' , coordinates);
    fetchISSFlyOverTimes(coordinates, (error, times)=> {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log('It worked! Returned Times:' , times);
    });
  });
});

