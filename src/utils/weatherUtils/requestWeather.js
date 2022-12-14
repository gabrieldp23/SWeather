import axios from 'axios';
import { getISOIntervalFromNow } from '../timeUtils';

async function getRawData(timeInterval, coords) {
	const options = {
		apikey: import.meta.env.VITE_API_KEY,
		fields: [
			'windSpeed',
			'temperature',
			'humidity',
			'cloudCover',
			'sunriseTime',
			'sunsetTime',
			'rainIntensity',
			'freezingRainIntensity',
			'snowIntensity',
			'precipitationType',
			'weatherCode', // get thunderstorms
			'precipitationProbability',
		],
		location: coords,
		interval: getISOIntervalFromNow(timeInterval),
		timesteps: '1h',
		units: 'metric',
	};

	const url = `https://api.tomorrow.io/v4/timelines/?location=${options.location.join()}&fields=${options.fields.join()}&timesteps=${
		options.timesteps
	}&units=${options.units}&startTime=${options.interval[0]}&endTime=${options.interval[1]}&apikey=${
		options.apikey
	}
	`;

	const promise = axios.get(url).then((response) => response.data.data.timelines[0].intervals);
	const dataPromise = promise;

	return dataPromise;
}

export default getRawData;
