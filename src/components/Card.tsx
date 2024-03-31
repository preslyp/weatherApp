import { Droplet, Thermometer, Wind } from "lucide-react";
import { getDayOfWeek, renderWeatherIcon, renderWindSpeed } from "../lib/utils";
import { CurrentLocalWeather, WeatherData } from "../types/Homepage";
import { AppConstants } from "@/constants";

const { STANDARD, METRIC } = AppConstants.metrics;

interface CardProps {
  currentLocalWeather: CurrentLocalWeather | null;
  data: WeatherData | undefined;
  error: string | null;
  loading: boolean;
  unit: string;
}

const Card: React.FC<CardProps> = ({
  currentLocalWeather,
  data,
  error,
  loading,
  unit,
}) => {
  if (loading || error || !data || !currentLocalWeather) {
    return (
      <div className="min-w-100 h-[284px] animate-pulse rounded-lg bg-gray-300" />
    );
  }

  console.log(data);

  return (
    <div className="min-w-100 h-full min-h-60 rounded-lg bg-gray-300 p-2 text-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-[100px] w-[100px]">
          <img
            src={renderWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
          />
        </div>
        <div className="flex items-center justify-between gap-4 font-semibold">
          <span>{getDayOfWeek(data.dt_txt)}</span>
          <span>
            {`${data.main.temp}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
          </span>
        </div>
        <p className="text-sm font-semibold text-blue-600 first-letter:uppercase">
          {data.weather[0].description}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 place-items-center gap-2 text-gray-600">
        <div className="flex flex-col items-center space-y-1 text-sm">
          <span>Humidity</span>
          <Droplet />
          <span>{`${data.main.humidity}%`}</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-sm">
          <span>Wind</span>
          <Wind />
          <span>{renderWindSpeed(data.wind.speed, unit)}</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-sm">
          <span>RealFeel</span>
          <Thermometer />
          <span>
            {`${data.main.feels_like}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
