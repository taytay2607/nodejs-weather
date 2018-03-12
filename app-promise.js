const yargs=require('yargs');
const axios=require('axios');

const argv = yargs
    .options({
        a:{
            demand: true,
            alias:'address',
            describe:'address to fetch weather for',
            string:true
        }
})
.help()
.alias('help','h')
.argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCfA-Wuoo34YvFpyZfTa5xSFyZ0lxEe7FQ&address=${encodeAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    //console.log(response.data.results[0]);
    var weatherUrl=`https://api.darksky.net/forecast/aae67094396643f7cbd316b5723e5658/${lat},${lng}`
    //console.log(response.data);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temputure=response.data.currently.temperature
    var apparentTemputure=response.data.currently.apparentTemperature
    console.log(`Currently temperature is ${temputure}. It feel like ${apparentTemputure}`)
}).catch((err)=>{
    if(err.code==='ENOTFOUND'){
        console.log('Unable to connect to API server.');
    }else{
        console.log(err.message);
    }
    //console.log(err);
});



