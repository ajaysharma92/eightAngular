var firstRoute  = require("./smartphone.json");
var secondRoute = require("./empDb.json");
var countryList = require("./countrylist.json");
// and so on

module.exports = function() {
return {
firstRoute  : firstRoute,
secondRoute : secondRoute,
countryList : countryList
// and so on
}
}