//Code based on https://open-meteo.com 's usage code

import { fetchWeatherApi } from 'openmeteo';
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

const coordinates = {
	gothenburg: {lat: 57.706, long: 11.961},
	halmstad: {lat: 56.658, long: 12.850},
	varberg: {lat: 57.111, long: 12.236},
	marstrand: {lat: 57.885, long: 11.588}
	}

const goth_responses = await fetchWeatherApi(WEATHER_API_URL, getParams(coordinates.gothenburg));
const halmstad_responses = await fetchWeatherApi(WEATHER_API_URL, getParams(coordinates.halmstad));
const varberg_responses = await fetchWeatherApi(WEATHER_API_URL, getParams(coordinates.varberg));
const marstrand_responses = await fetchWeatherApi(WEATHER_API_URL, getParams(coordinates.marstrand));

const responses: {[key:string]: any } = { gothenburg: goth_responses[0].hourly()!,
	halmstad: halmstad_responses[0].hourly()!,
	varberg: varberg_responses[0].hourly()!,
	marstrand: marstrand_responses[0].hourly()!
}  

console.log(responses)

function getParams(loc: {lat: number, long: number}): any {
	const date = getDateNow()
	return {
	"latitude": loc.lat,
	"longitude": loc.long,
	"hourly": ["temperature_2m", "precipitation", "pressure_msl", "visibility", "wind_speed_10m", "wind_direction_10m"],
	"start_date": date,
	"end_date": "2025-10-06",
	}
};

function getDateNow(): string {
	const date = new Date()
	return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`
};


// Attributes for timezone and location
//const latitude = response.latitude();
//const longitude = response.longitude();
//const elevation = response.elevation();
//const utcOffsetSeconds = response.utcOffsetSeconds();

//console.log(
//	`\nCoordinates: ${latitude}°N ${longitude}°E`,
//	`\nElevation: ${elevation}m asl`,
//	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
//);



// Note: The order of weather variables in the URL query and the indices below need to match!
function getWeatherData(hourly: any): any {
	return {
		hourly: {
			time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
				(_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
			),
			temperature_2m: hourly.variables(0)!.valuesArray(),
			precipitation: hourly.variables(1)!.valuesArray(),
			pressure_msl: hourly.variables(2)!.valuesArray(),
			visibility: hourly.variables(3)!.valuesArray(),
			wind_speed_10m: hourly.variables(4)!.valuesArray(),
			wind_direction_10m: hourly.variables(5)!.valuesArray(),
		},
	}
}

export function mapWeather(location:string): string {
	var response: string[] = []

	const hourly = responses[location];
	
	const weatherData = getWeatherData(hourly)

	
	var temp_rep = "hot"
	for (var temp of weatherData.hourly.temperature_2m){
		if (Number(temp) < 5){
			temp_rep = "cold"
		}
	}
	response.push(temp_rep)
	
	var prec_rep = "dry"
	for (var prec of weatherData.hourly.precipitation){
		if (Number(prec) > 2){
			prec_rep = "wet"
		}		
	}
	response.push(prec_rep)

	return response.join(" ")
}