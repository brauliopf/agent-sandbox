const ACCUWEATHER_API_KEY = 'cUdYmQBrT5ceVvOz4yJedEcemWGJAgfY'

export async function getCurrentLocation(){
    return 'Boston, MA'
}

export async function getCurrentWeather_backup(){
    const weather = {
        temperature: '21',
        unit: 'C',
        forecast: 'sunny'
    }
    return JSON.stringify(weather)
}

export async function getCurrentWeather(){
    // GET location key from AccuWeather API
    const location = await getCurrentLocation()
    const location_key = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${location}`)
    const location_key_json = await location_key.json()
    const location_key_id = location_key_json[0].Key

    // GET current conditions from AccuWeather API
    const current_conditions = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${location_key_id}?apikey=${ACCUWEATHER_API_KEY}`)
    const current_conditions_json = await current_conditions.json()

    const weather = {
        temperature: current_conditions_json[0].Temperature.Metric.Value,
        unit: current_conditions_json[0].Temperature.Metric.Unit,
        forecast: current_conditions_json[0].WeatherText
    }
    
    console.log(JSON.stringify(weather))
    return JSON.stringify(weather)

}