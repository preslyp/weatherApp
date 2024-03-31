import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppConstants } from "../constants";
import moment from "moment";
import { WeatherData } from "../types/Homepage";

const { IMPERIAL } = AppConstants.metrics;

/**
 * Combines class names using the provided utility libraries `clsx` and `twMerge`.
 *
 * @param inputs - An array of class names to combine.
 * @returns The merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Renders the city name.
 * @param {string} name - The name of the city.
 * @returns {string} The rendered city name.
 */
export const renderCityName = (name: string): string => {
  return name === "Municipality of the Capital" ? "Sofia" : name;
};

/**
 * Renders the weather icon URL.
 * @param {string} icon - The weather icon code.
 * @returns {string} The URL of the weather icon.
 */
export const renderWeatherIcon = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const today = moment().format("dddd");

/**
 * Retrieves weather data grouped by dates.
 * @param data - Array of weather data objects.
 * @param skipToday - Whether to skip today's data. Default is false.
 * @returns Object with weather data grouped by dates.
 */
export const getDataByDates = (
  data: WeatherData[],
  skipToday: boolean = false,
): { [key: number]: WeatherData[] } => {
  const nextDays: string[] = skipToday ? [] : [moment().format("YYYY-MM-DD")];
  const filteredDataByDate: { [key: number]: WeatherData[] } = {};

  for (let i = 0; i < 4; i++) {
    const nextDate = moment()
      .add(i + 1, "days")
      .format("YYYY-MM-DD");
    nextDays.push(nextDate);
  }

  nextDays.forEach((date, index) => {
    const filteredData = data.filter((obj) => obj.dt_txt.includes(date));
    filteredDataByDate[index + 1] = filteredData;
  });
  return filteredDataByDate;
};

/**
 * Retrieves the day of the week from a given date string.
 * @param dateString - Date string in format 'YYYY-MM-DD'.
 * @returns Day of the week.
 */
export const getDayOfWeek = (dateString: string): string => {
  return moment(dateString).format("dddd");
};

/**
 * Extracts the time from a given date-time string.
 * @param {string} dateTimeString The date-time string in the format 'YYYY-MM-DD HH:mm:ss'.
 * @returns {string} The time extracted from the date-time string in the format 'HH:mm:ss'.
 */
export const getTimeFromDateTime = (dateTimeString: string): string => {
  return moment(dateTimeString, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss");
};

/**
 * Renders wind speed with appropriate unit.
 * @param {number} data The wind speed value.
 * @param {string} unit The unit of measurement (IMPERIAL or METRIC).
 * @returns {string} The wind speed with appropriate unit.
 */
export const renderWindSpeed = (data: number, unit: string): string => {
  return `${data} ${unit === IMPERIAL ? "mph" : "m/s"}`;
};
