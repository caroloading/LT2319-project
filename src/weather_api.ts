//Code based on https://open-meteo.com 's usage code

import { fetchWeatherApi } from 'openmeteo';
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

const coordinates = [
	{lat: 57.706, long: 11.961}, // gothenburg
	{lat: 56.658, long: 12.850}, //halmstad
	{lat: 57.111, long: 12.236}, // varberg
	{lat: 57.885, long: 11.588} // marstrand
]

const responses = await fetchWeatherApi(WEATHER_API_URL, getParams(coordinates));

const responses_dict: {[key:string]: any } = { gothenburg: [responses[0].current()!, responses[0].utcOffsetSeconds()],
	halmstad: [responses[1].current()!, responses[1].utcOffsetSeconds()],
	varberg: [responses[2].current()!, responses[2].utcOffsetSeconds()],
	marstrand: [responses[3].current()!,, responses[3].utcOffsetSeconds()]
}  

console.log(responses)

function getParams(coordinates: {lat: number, long: number}[]): any {
	var lats : number[] = []
	var longs : number[] = []
	for (const loc of coordinates){
		lats.push(loc.lat)
		longs.push(loc.long)
	}

	return {
		"latitude": lats,
		"longitude": longs,
		"current": ["temperature_2m", "precipitation", "visibility", "wind_speed_10m", "wind_direction_10m"],
	}
};


// Note: The order of weather variables in the URL query and the indices below need to match!
function getWeatherData(current: any, utcOffset: any): any {
	return {
		current: {
			time: new Date((Number(current.time()) + utcOffset) * 1000),
			temperature_2m: current.variables(0)!.value(),
			precipitation: current.variables(1)!.value(),
			visibility: current.variables(3)!.value(),
			wind_speed_10m: current.variables(4)!.value(),
			wind_direction_10m: current.variables(5)!.value(),
		},
	}
}

export function mapWeather(location:string, aspect: string): string {
	var response: string[] = []
	const [current, utcOffset] = responses_dict[location];	
	const weatherData = getWeatherData(current, utcOffset)
	
	if (aspect == "all" || aspect == "temperature" || aspect == "precipitation"){
		var temp_rep = "hot"
		const temp = weatherData.current.temperature_2m
		if (Number(temp) < 5){
			temp_rep = "cold"
		}	
		if (aspect == "temperature"){
			return temp_rep
		} else {
			response.push(temp_rep)
		}

		var prec_rep = "dry"
		const prec = weatherData.current.precipitation
		if (Number(prec) > 2){
			prec_rep = "wet"
		}		
		if (aspect == "precipitation"){
			return prec_rep
		} else {
			response.push(prec_rep)
		}

		return response.join(" ")
	} else if (aspect == "visibility"){
		var vis_rep = "good"
		const vis = weatherData.current.visibility
		if (Number(vis) < 4000){
			vis_rep = "low"
		}	
		return vis_rep
	} else if (aspect == "wind"){
		var wind_rep = "strong"
		const wind_speed = weatherData.current.wind_speed_10m
		if (Number(wind_speed) <28){
			wind_rep = "light"
		}		
		
		var wind_d_rep = ""
		const wind_dir = weatherData.current.wind_direction_10m
		if (Number(wind_dir) >= 45 && Number(wind_dir) < 135){
			wind_d_rep += "east"
		} else if (Number(wind_dir) >= 135 && Number(wind_dir) < 225){
			wind_d_rep += "south"
		} else if (Number(wind_dir) >= 225 && Number(wind_dir) < 315){
			wind_d_rep += "west"
		} else if (Number(wind_dir) >= 315 || Number(wind_dir) < 45){
			wind_d_rep += "north"
		} 
		wind_rep += " " + wind_d_rep	

		return wind_rep
	} else {
		return "no info"
	}

	
}