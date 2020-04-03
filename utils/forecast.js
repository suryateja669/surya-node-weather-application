const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url='https://api.darksky.net/forecast/93b77c59e2fb537ae4458026fd04fdb0/'+encodeURIComponent(latitude)+encodeURIComponent(',')+encodeURIComponent(longitude)+'?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({error:'Unable to connect to weather service!'}, undefined)
        } else if (body.error) {
            callback({error:'Unable to find location'}, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast