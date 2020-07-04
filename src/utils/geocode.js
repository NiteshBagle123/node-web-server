const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFnbGVuIiwiYSI6ImNrNGp6ZnZ2eDFsOWIzZXF3b3djNnR1MW0ifQ.sDDE32NA5saAoOCWKdistw&limit=1`;

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('unable to connect to server', undefined);
        }else if(body.features && !body.features.length) {
            callback('Unable to find location, please enter valid location', undefined);
        } else {
            const { center, place_name } = body.features[0]
            callback(undefined, {
                latitude: center[1].toFixed(2),
                longitide: center[0].toFixed(2),
                location: place_name
            });
        }
    })
};

module.exports = geocode;