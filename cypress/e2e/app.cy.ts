import { weatherBaseAPI } from "../../src/constants";

describe("App spec", () => {
  Cypress.config("baseUrl", "http://localhost:5173");

  beforeEach(() => {
    cy.intercept(
      "GET",
      `${weatherBaseAPI}/weather?lat=*&lon=*&appid=*&units=*`,
    ).as("currentWeatherApi");

    cy.intercept(
      "GET",
      `${weatherBaseAPI}/forecast?lat=*&lon=*&appid=*&units=*`,
    ).as("forecastApi");

    cy.visit("/");
  });

  it("should persist metric selection", () => {
    cy.wait(["@currentWeatherApi", "@forecastApi"]);

    // Check default temperature unit
    cy.log("Correctly displays the temperature in Fahrenheit (default)");
    cy.get("[data-cy-id='temperature']").contains("F");

    // Switch to Celsius and verify
    cy.log("Correctly displays the temperature in Celsius");
    cy.get("[data-cy-id='metrics-btn']").click();
    cy.get("[data-cy-id='metric']").click();
    cy.wait(["@currentWeatherApi", "@forecastApi"]);
    cy.get("[data-cy-id='temperature']").contains("C");

    // Verify persistence after reload
    cy.log("Persist the metric selection after reload");
    cy.reload();
    cy.wait(["@currentWeatherApi", "@forecastApi"]);
    cy.get("[data-cy-id='temperature']").contains("C");
    cy.get("[data-cy-id='metrics-btn']").click();
    cy.get("[data-cy-id='imperial']").click();
    cy.wait(["@currentWeatherApi", "@forecastApi"]);
  });

  it("should navigate correctly", () => {
    // Navigate to forecast details page
    cy.log("Open the forecast details page");
    cy.get("[data-cy-id='hero']").click();
    cy.wait(["@forecastApi"]);
    cy.url().should("include", "forecast-details");

    // Navigate back to home page and verify temperature unit
    cy.log("Open the Home page");
    cy.get("[data-cy-id='home']").click();
    cy.get("[data-cy-id='temperature']").contains("F");
  });
});
