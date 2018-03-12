const request = require('request');

var getWeather=(lat,lng,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/aae67094396643f7cbd316b5723e5658/${lat},${lng}`,
        json:true
    },(err,responce,body)=>{
        if(!err && responce.statusCode===200){
            callback(undefined,{
                currentTemperature:body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature
            });
        }else{
            callback('Unable to fetch weather');
        }
    });
}

module.exports.getWeather=getWeather;
