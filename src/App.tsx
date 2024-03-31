import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import ForecastDetails from "./pages/ForecastDetails";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="forecast-details/:city/:day/:latitude/:longitude"
            element={<ForecastDetails />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
export default App;
