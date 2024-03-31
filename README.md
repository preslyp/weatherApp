# Welcome to WeatherScan

WeatherScan is a sleek and efficient weather application built using Vite and Tailwind CSS.

[Vite](https://pip.pypa.io/en/stable/): Vite is a next-generation frontend tooling that brings a significantly faster development experience. With Vite, WeatherScan loads instantly, ensuring you get the weather information you need without any delay.

[Tailwind CSS](https://pip.pypa.io/en/stable/): Tailwind CSS is a utility-first CSS framework for creating custom designs quickly and easily. It enables us to craft a beautiful and responsive interface with minimal effort, ensuring that WeatherScan not only looks great but also matches your personal style preferences.

#### Requirements

Primary requirement for running the UI is to have `node` installed ([nodejs.org](https://nodejs.org)). The required version is `>=18`.

In order for the application to work, it needs an API key for [OpenWheather](https://openweathermap.org), from which it gets the data. After cloning the code, create a **.env** file. In it, add:

```
 VITE_WEATHER_API_KEY='your key'
 ```

### Running

To run the UI navigate to **ROOT** and install the latest dependencies (`npm install`). `npm run dev` will serve the UI on http://localhost:5173.

```
cd weatherApp
npm install
npm run dev
```

### Testing

For the purpose of testing the application, we have added [Cypress](https://www.cypress.io/). To start cypress tests, you first need to run the command:

```
npm run cypress
```

### Storybook
To view the components that the application is built with, we have also added [Storybook](
https://storybook.js.org/). To start storybook, use the following command:

```
npm run storybook
```
