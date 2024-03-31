import Card from "../components/CardDetails";

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
    data,
    error: null,
    loading: false,
    unit: "",
  },
  argTypes: {
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
