const request = require('request');
const yargs=require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(results.address);
        //pass in lat and lng
        weather.getWeather(results.lat,results.lng,(err,weatherResults)=>{
            if(err){
                console.log(err);
            }else{
                //console.log(JSON.stringify(weatherResults,undefined,2));
                console.log(`Currently temperature is ${weatherResults.currentTemperature}. It feel like ${weatherResults.apparentTemperature}`)
            }
        });
    }
});



