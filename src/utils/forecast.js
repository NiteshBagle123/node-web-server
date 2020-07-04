const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9fa0798af554b948b4010a6010f0a271&query=${longitude},${latitude}&units=f`;
    request({ url, json: true }, (err, { body }) => {
        if(err){
            callback('unable to connect weather service', undefined);
        } else if(body && body.error) {
            callback('unable to find location', undefined);
        } else {
            const { temperature, precip, weather_descriptions } = body.current
            callback(undefined, {
                temperature,
                precip,
                description: weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast;