let request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", function(error, response, body) {
    console.log(response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).ip;
    callback(null, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    let data = JSON.parse(body);
    if (!data.success) {
      let msg = `Success status was false. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude} = data;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coordinates, (error, times)=> {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};

module.exports = { 
  //fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, 
  nextISSTimesForMyLocation };