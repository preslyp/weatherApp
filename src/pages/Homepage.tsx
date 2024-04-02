import { useContext, useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthPageWrapper";
import { AppContext } from "../context/AppContext";
import HeroSection from "../components/HeroSection";
import Card from "../components/Card";
import { renderCityName } from "@/lib/utils";
import { Link } from "react-router-dom";

const Homepage = (): JSX.Element => {
  const {
    appState: { unit },
    coords,
    getWeatherData,
    forecastWeather,
    currentLocalWeather,
    isLoading,
    error,
  } = useContext(AppContext)!;

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData, unit]);

  return (
    <div>
      <MaxWidthWrapper>
        <HeroSection />
        <h2 className="mx-4 mt-16 text-xl text-gray-900 lg:mx-0">
          Next four days forecast
        </h2>
        <section className="mx-4 mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => index + 1).map((item) => {
            return (
              <Link
                key={item}
                to={`/forecast-details/${renderCityName(currentLocalWeather?.name || "")}/${item}/${coords?.latitude}/${coords?.longitude}`}
              >
                <Card
                  currentLocalWeather={currentLocalWeather}
                  data={forecastWeather?.[item][4]}
                  error={error}
                  loading={isLoading}
                  unit={unit}
                />
              </Link>
            );
          })}
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Homepage;
