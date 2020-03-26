const request = require('request')
const forecast = (longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/275cd2e035801a40a8b404e428e6aa7f/'+longitude +','+ latitude +'?units=si&lang=en'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,body.currently.temperature) 
            
        }
    })
}

module.exports = forecast