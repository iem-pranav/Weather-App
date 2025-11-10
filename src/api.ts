import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { GeocodeSchema } from "./schemas/geocodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({
  lat,
  lon,
  units = "metric", // metric=°C, imperial=°F, standard=K
}: {
  lat: number;
  lon: number;
  units?: "metric" | "imperial" | "standard";
}) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();
  return weatherSchema.parse(data);
}

export async function getGeocode(location: string) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
  );
  const data = await res.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await res.json();
  return AirPollutionSchema.parse(data);
}
