import { create } from "zustand";
import { WeatherData } from "../types/weatherTypes";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/weatherApi";
import {
  getWeatherFromCache,
  saveWeatherToCache,
} from "../services/cacheService";
import { getUserCoords } from "../api/location";

interface WeatherState {
  homeWeather: WeatherData | null;
  searchWeather: WeatherData | null;
  loading: boolean;
  error: string | null;
  loadWeatherByLocation: () => Promise<void>;
  loadWeatherByCity: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  homeWeather: null,
  searchWeather: null,
  loading: false,
  error: null,

  loadWeatherByLocation: async () => {
    try {
      set({ loading: true, error: null });

      const { lat, lon } = await getUserCoords();
      const weather = await fetchWeatherByCoords(lat, lon);

      set({ homeWeather: weather, loading: false });

      await saveWeatherToCache(weather);
    } catch (e) {
      console.log("Cannot load weather from network, trying cache...", e);

      const cachedHome = await getWeatherFromCache();
      if (cachedHome) {
        set({ homeWeather: cachedHome, loading: false });
      } else {
        set({ error: "Cannot load weather", loading: false });
      }
    }
  },

  loadWeatherByCity: async (city) => {
    try {
      set({ loading: true, error: null });
      const weather = await fetchWeatherByCity(city);

      set({
        searchWeather: weather,
        loading: false,
      });
    } catch (e) {
      set({ error: "Cannot load weather", loading: false });
    }
  },
}));
