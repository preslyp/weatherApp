import { ReactNode, createContext, useCallback, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CurrentLocalWeather, WeatherData } from "../types/Homepage";
import axios from "axios";
import { getDataByDates } from "@/lib/utils";
import { weatherBaseAPI } from "@/constants";

/**
 * Interface for the application state.
 */
interface AppState {
  unit: string;
}

/**
 * Interface for the context value provided by the AppContext.
 */
interface AppContextType {
  appState: AppState;
  coords: GeolocationCoordinates | null;
  currentLocalWeather: CurrentLocalWeather | null;
  error: string | null;
  getWeatherData: () => void;
  getWeatherDetails: (latitude: number, longitude: number) => void;
  handleMetricChange: (value: string) => void;
  forecastWeather: {
    [key: number]: WeatherData[];
  } | null;
  isLoading: boolean;
}
const localStorageKey = "appState";

const initialState = { unit: "" };

/**
 * Generates the API endpoint for current weather data.
 * @param latitude - Latitude coordinate.
 * @param longitude - Longitude coordinate.
 * @param unit - Unit of measurement for temperature.
 * @returns API endpoint for current weather data.
 */
const getCurrentWeatherApi = (
  latitude: number,
  longitude: number,
  unit: string,
): string => {
  return `${weatherBaseAPI}/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`;
};

/**
 * Generates the API endpoint for current weather data.
 * @param latitude - Latitude coordinate.
 * @param longitude - Longitude coordinate.
 * @param unit - Unit of measurement for temperature.
 * @returns API endpoint for current weather data.
 */
const getForecastApi = (
  latitude: number,
  longitude: number,
  unit: string,
): string => {
  return `${weatherBaseAPI}/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`;
};

/**
 * Context for managing application state.
 */
export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [appState, setAppState] = useLocalStorage<AppState>(
    localStorageKey,
    initialState,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocalWeather, setCurrentLocalData] =
    useState<CurrentLocalWeather | null>(null);
  const [forecastWeather, setForecastWeather] = useState<{
    [key: number]: WeatherData[];
  } | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  /**
   * Fetches current weather data based on the user's location.
   * @function getWeatherData
   * @returns {void}
   */
  const getWeatherData = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords(position.coords);

        const currentWeatherApi = getCurrentWeatherApi(
          latitude,
          longitude,
          appState.unit,
        );
        const forecastApi = getForecastApi(latitude, longitude, appState.unit);

        axios
          .all([axios.get(currentWeatherApi), axios.get(forecastApi)])
          .then(
            axios.spread((current, forecast) => {
              setCurrentLocalData(current.data);
              setForecastWeather(getDataByDates(forecast.data.list, true));
            }),
          )
          .catch(() => {
            setError("Opps... Please try again later.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      () => {
        setError("Please enable your geolocation and refresh the page.");
        setIsLoading(false);
      },
    );
  }, [appState.unit]);

  /**
   * Retrieves weather details based on coordinates and updates the state accordingly.
   * @param {number} latitude The latitude coordinate.
   * @param {number} longitude The longitude coordinate.
   * @returns {void}
   */
  const getWeatherDetails = useCallback(
    (latitude: number, longitude: number) => {
      const forecastApi = getForecastApi(latitude, longitude, appState.unit);

      setIsLoading(true);
      axios
        .get(forecastApi)
        .then((forecast) => {
          setForecastWeather(getDataByDates(forecast.data.list));
        })
        .catch(() => {
          setError("Opps... Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [appState.unit],
  );

  /**
   * Handles the change of metric units.
   * @param value The new metric value to be set.
   */
  const handleMetricChange = (value: string) => {
    setAppState((prevState) => ({ ...prevState, unit: value }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        coords,
        currentLocalWeather,
        error,
        getWeatherData,
        getWeatherDetails,
        handleMetricChange,
        forecastWeather,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
