const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2luZ21ha2VyY29kaW5nbmluamFzIiwiYSI6ImNrODZ3c3dwaDAybnYzbG5xam44amxwamcifQ.2VF93LIWOqUznbeSpjjEnQ&limit=1';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
           return callback({error:'Unable to connect to location services!'}, undefined)
         }
         else if (body.features.length === 0) {
           return callback({error:"Unable to find the given address!"}, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })}
            
        
    })
}

module.exports = geocode