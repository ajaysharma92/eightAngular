const smartphone  = require("./smartphone");
const empdata = require("./empDb");
const countryList = require("./countrylist");
const Path = require("path");
const glob = require("glob");
const apiFiles = glob.sync(Path.resolve(__dirname, "./") + "/**/*.js", {
    nodir: true
})
// and so on

module.exports = () => ({
    smartphone,
    empdata, 
    countryList
});