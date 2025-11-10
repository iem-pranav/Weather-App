import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  // 🌡️ Manage unit selection (C / F / K)
  const [unit, setUnit] = useState<"metric" | "imperial" | "standard">(
    "metric"
  );

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords, unit],
    queryFn: () =>
      getWeather({ lat: coords.lat, lon: coords.lon, units: unit }),
  });

  // Unit symbols
  const symbol = unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K";

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span>Daily Forecast</span>

          {/* 🌗 Theme-Responsive Unit Selector */}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="
              bg-gray-100 
              dark:bg-gray-800 
              border border-gray-300 
              dark:border-gray-600 
              text-gray-800 
              dark:text-gray-200 
              text-sm rounded-md px-2 py-1 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              transition
            "
          >
            <option value="metric">°C</option>
            <option value="imperial">°F</option>
            <option value="standard">K</option>
          </select>
        </div>
      }
      childrenClassName="flex flex-col gap-4 2xl:justify-between"
    >
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>

          <WeatherIcon src={day.weather[0].icon} />

          <p>
            {Math.round(day.temp.day)}
            {symbol}
          </p>
          <p className="text-gray-500/75">
            {Math.round(day.temp.min)}
            {symbol}
          </p>
          <p className="text-gray-500/75">
            {Math.round(day.temp.max)}
            {symbol}
          </p>
        </div>
      ))}
    </Card>
  );
}
