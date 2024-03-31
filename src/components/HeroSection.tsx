import { useContext } from "react";
import { CircleGauge, Cloud, Droplet, Thermometer, Wind } from "lucide-react";
import { AppContext } from "../context/AppContext";
import {
  renderCityName,
  renderWeatherIcon,
  renderWindSpeed,
  today,
} from "../lib/utils";
import { Link } from "react-router-dom";
import { AppConstants } from "@/constants";
const { STANDARD, METRIC } = AppConstants.metrics;

const HeroSection = (): JSX.Element => {
  const {
    appState: { unit },
    coords,
    currentLocalWeather,
    isLoading,
    error,
  } = useContext(AppContext)!;

  return (
    <section className="mx-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0">
      <div className="flex flex-col justify-center space-y-8 pb-5 pt-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Stay ahead with live weather updates
        </h1>
        {!error ? (
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">
            Unleash the magic of personalized forecasts tailored to your
            location — simply
            <span className="pl-2 font-bold uppercase text-orange-700">
              enable your geolocation.
            </span>
          </p>
        ) : (
          <p className="mt-4 text-lg font-bold uppercase text-orange-700 sm:text-xl">
            {error}
          </p>
        )}
      </div>
      {currentLocalWeather && !isLoading && !error ? (
        <Link
          to={`/forecast-details/${renderCityName(currentLocalWeather.name)}/today/${coords?.latitude}/${coords?.longitude}`}
        >
          <div
            className="min-w-100 h-full min-h-60 rounded-lg bg-gray-300 p-7 text-gray-900"
            data-cy-id="hero"
          >
            <div className="flex justify-between space-x-8">
              <div className="flex flex-col items-center">
                <div className="h-[100px] w-[100px]">
                  <img
                    src={renderWeatherIcon(currentLocalWeather.weather[0].icon)}
                    alt={currentLocalWeather.weather[0].description}
                  />
                </div>
                <h1 className="text-2xl font-semibold lg:text-4xl">
                  {renderCityName(currentLocalWeather.name)}
                </h1>
              </div>
              <div className="flex flex-col items-center space-y-6">
                <span
                  className="text-3xl font-bold lg:text-6xl"
                  data-cy-id="temperature"
                >
                  {`${currentLocalWeather.main.temp}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
                </span>
                <h2 className="text-xl font-semibold text-blue-600 first-letter:uppercase">
                  {currentLocalWeather.weather[0].description}
                </h2>
                <h3 className="text-gray-600">{today}</h3>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-4 text-gray-600">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm">Humidity</span>
                <Droplet />
                <span>{`${currentLocalWeather.main.humidity}%`}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm">Wind</span>
                <Wind />
                <span>
                  {renderWindSpeed(currentLocalWeather.wind.speed, unit)}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm">RealFeel</span>
                <Thermometer />
                <span>
                  {`${currentLocalWeather.main.feels_like}${unit === METRIC ? "°C" : unit === STANDARD ? "K" : "F"}`}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm">Cloud Cover</span>
                <Cloud />
                <span>{`${currentLocalWeather.clouds.all}%`}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm">Pressure</span>
                <CircleGauge />
                <span>{`${currentLocalWeather.main.pressure} mb`}</span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="h-[316px] animate-pulse rounded-lg bg-gray-300" />
      )}
    </section>
  );
};

export default HeroSection;
