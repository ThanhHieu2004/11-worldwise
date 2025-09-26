import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
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
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    return new Error("CitiesContext was used outside of the CitiesProvider ");
  return context;
}

export { CitiesProvider, useCities };
