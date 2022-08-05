const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  let data = JSON.parse(ip).ip;
  return request(`https://ipwho.is/${data}`);
}

const fetchISSFlyOverTimes = function(coords) {
  let data = JSON.parse(coords);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${data.latitude}&lon=${data.longitude}`)
};

const nextISSTimesForMyLocation = function() {
 return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const {response} = JSON.parse(data);
    return response;
  })
};
module.exports = { nextISSTimesForMyLocation };
