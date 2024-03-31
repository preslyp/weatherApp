import { AppConstants } from "@/constants";
import {
  getTimeFromDateTime,
  renderWeatherIcon,
  renderWindSpeed,
} from "@/lib/utils";
import { WeatherData } from "@/types/Homepage";

const { STANDARD, METRIC } = AppConstants.metrics;

interface CardDetailsProps {
  data: WeatherData | undefined;
  error: string | null;
  loading: boolean;
  unit: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  data,
  error,
  loading,
  unit,
}) => {
  if (loading || error || !data) {
    return (
      <div className="mx-auto mt-4 flex min-h-[404px] w-[300px] animate-pulse flex-col justify-center gap-4 rounded-lg  bg-gray-300 p-7 md:w-[400px] lg:w-[600px]" />
    );
  }

  return (
    <div className="mx-auto mt-4 flex min-h-[404px] w-[300px] flex-col justify-center gap-4 rounded-lg bg-gray-300  p-7 md:w-[400px] lg:w-[600px]">
      <div className="flex justify-between border-b border-gray-600 py-2 text-gray-900">
        <h1 className="text-sm">Current weather</h1>
        <span>{getTimeFromDateTime(data.dt_txt)}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-[100px] w-[100px]">
            <img
              src={renderWeatherIcon(data.weather[0].icon)}
              alt="clear sky"
            />
          </div>
          <p className="text-sm font-semibold text-blue-600 first-letter:uppercase ">
            {data.weather[0].description}
          </p>
        </div>
        <div className="flex flex-col gap-3 py-8 lg:items-start">
          <p className="text-sm">
            RealFeel:{" "}
            {`${data.main.feels_like}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
          </p>
          <p className="text-sm">
            Max Temperature:{" "}
            {`${data.main.temp_max}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
          </p>
          <p className="text-sm">
            Max Temperature:{" "}
            {`${data.main.temp_min}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="flex border-spacing-y-6 items-center justify-between border-b border-gray-500 py-2">
            <span className="text-sm">Pressure:</span>
            <span>{`${data.main.pressure} hPa`}</span>
          </div>
          <div className="flex border-spacing-y-6 items-center justify-between border-b border-gray-500 py-2">
            <span className="text-sm">Humidity:</span>
            <span>{`${data.main.humidity} %`}</span>
          </div>
          <div className="flex border-spacing-y-6 items-center justify-between border-b border-gray-500 py-2">
            <span className="text-sm">Cloudiness:</span>
            <span>{`${data.clouds.all} %`}</span>
          </div>
        </div>
        <div>
          <div className="flex border-spacing-y-6 items-center justify-between border-b border-gray-500 py-2">
            <span className="text-sm">Wind speed:</span>
            <span>{renderWindSpeed(data.wind.speed, unit)}</span>
          </div>
          <div className="flex border-spacing-y-6 items-center justify-between border-b border-gray-500 py-2">
            <span className="text-sm">Visibility:</span>
            <span>{`${data.visibility} m`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
