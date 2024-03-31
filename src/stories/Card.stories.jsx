import Card from "../components/Card";

const currentLocalWeather = {
  coord: {
    lon: 23.2879,
    lat: 42.6669,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 298.73,
    feels_like: 298,
    temp_min: 298.73,
    temp_max: 299.04,
    pressure: 1016,
    humidity: 25,
  },
  visibility: 10000,
  wind: {
    speed: 1.54,
    deg: 200,
  },
  clouds: {
    all: 0,
  },
  dt: 1711894073,
  sys: {
    type: 1,
    id: 6366,
    country: "BG",
    sunrise: 1711858220,
    sunset: 1711903873,
  },
  timezone: 10800,
  id: 6458974,
  name: "Municipality of the Capital",
  cod: 200,
};

const data = {
  dt: 1711972800,
  main: {
    temp: 299.4,
    feels_like: 299.4,
    temp_min: 299.4,
    temp_max: 299.4,
    pressure: 1013,
    sea_level: 1013,
    grnd_level: 932,
    humidity: 20,
    temp_kf: 0,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  clouds: {
    all: 51,
  },
  wind: {
    speed: 5.87,
    deg: 214,
    gust: 9.18,
  },
  visibility: 10000,
  pop: 0,
  sys: {
    pod: "d",
  },
  dt_txt: "2024-04-01 12:00:00",
};

export default {
  component: Card,
  args: {
    currentLocalWeather,
    data,
    error: null,
    loading: false,
    unit: "",
  },
  argTypes: {
    currentLocalWeather: {
      control: { type: "object" },
    },
    data: {
      control: { type: "object" },
    },
    error: {
      control: { type: "null" },
    },
    loading: {
      control: { type: "boolean" },
    },
    unit: {
      control: { type: "text" },
    },
  },
};

const Template = ({ ...args }) => {
  return <Card {...args} />;
};

export const Basic = {
  render: Template,
};
