var util = {
    getStyleValue: function(valueStr){
        return Number(valueStr.substr(0, valueStr.length-2))
    }
};

module.exports = util;
