import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, { signal: signal });
        const data = await res.json();
        setCities(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          alert(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
    return () => controller.abort();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            path="cities"
            element={<CityList isLoading={isLoading} cities={cities} />}
          />
          <Route path="countries" element={<div>Countries</div>} />
          <Route path="form" element={<div>Form</div>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
