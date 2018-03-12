const request = require('request');

var geocodeAddress=(address,callback)=>{
    //console.log(argv.address);
    var encodeAddress = encodeURIComponent(address);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCfA-Wuoo34YvFpyZfTa5xSFyZ0lxEe7FQ&address=${encodeAddress}`,
        json: true
    },(err,responce,body)=>{
        if(err){
            callback('Unable to connect to google servers');
        }else if(body.status==='ZERO_RESULTS'){
            callback('Unable to find that address');
        }
        else if(body.status==='OK'){
            callback(undefined,{
                address:body.results[0].formatted_address,
                lat:body.results[0].geometry.location.lat,
                lng:body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress=geocodeAddress;