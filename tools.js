export async function getCurrentLocation(){
    return 'Boston, MA'
}

export async function getCurrentWeather(){
    const weather = {
        temperature: '21',
        unit: 'C',
        forecast: 'sunny'
    }
    return JSON.stringify(weather)
}