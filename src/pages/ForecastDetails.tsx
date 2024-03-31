import { Link, useParams } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthPageWrapper";
import { ChevronRight, Home } from "lucide-react";
import moment from "moment";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { WeatherData } from "@/types/Homepage";
import CardDetails from "@/components/CardDetails";

const ForecastDetails = (): JSX.Element => {
  const {
    appState: { unit },
    getWeatherDetails,
    forecastWeather,
    error,
    isLoading,
  } = useContext(AppContext)!;
  const { city, day, latitude, longitude } = useParams();

  const currentDay: number = day === "today" ? 1 : Number(day);

  useEffect(() => {
    getWeatherDetails(Number(latitude), Number(longitude));
  }, [getWeatherDetails, latitude, longitude, unit]);

  return (
    <MaxWidthWrapper>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                data-cy-id="home"
              >
                <Home size={14} className="mr-4 text-gray-900" />
                <p>Home</p>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight size={14} className="text-gray-900" />
              <p className="ms-1 text-sm font-medium text-gray-900  dark:text-gray-400 md:ms-2">
                {`Forecast details for ${city}`}
              </p>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-16 flex justify-center border-b border-gray-900 py-4">
        <p>{moment().format("LLLL")}</p>
      </div>
      <section className="flex flex-col rounded-lg text-gray-900">
        {forecastWeather &&
          forecastWeather[currentDay].map((item: WeatherData) => (
            <CardDetails
              key={item.dt}
              data={item}
              error={error}
              loading={isLoading}
              unit={unit}
            />
          ))}
      </section>
    </MaxWidthWrapper>
  );
};

export default ForecastDetails;
