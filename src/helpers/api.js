export const buildBackendURL = route => {
  const protocol = (window.location.protocol === "https:" ? "https://" : "http://");
  const baseUrl = (window.location.hostname === "localhost" ? "localhost:8000" : "co2-calculator-api.herokuapp.com");
  return protocol + baseUrl + route;
}