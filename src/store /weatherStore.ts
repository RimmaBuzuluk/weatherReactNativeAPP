import { create } from "zustand";
import { WeatherData } from "../types/weatherTypes";
import {
  CityNotFoundError,
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../api/weatherApi";
import {
  getWeatherFromCache,
  saveWeatherToCache,
} from "../services/cacheService";
import { getUserCoords } from "../api/location";
import { isOnline } from "../services/network";

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
    set({ loading: true, error: null });

    if (!(await isOnline())) {
      const cachedHome = await getWeatherFromCache();

      if (cachedHome) {
        set({ homeWeather: cachedHome, loading: false });
      } else {
        set({ error: "OFFLINE", loading: false });
      }
      return;
    }

    try {
      const { lat, lon } = await getUserCoords();
      const weather = await fetchWeatherByCoords(lat, lon);

      set({ homeWeather: weather, loading: false });
      await saveWeatherToCache(weather);
    } catch {
      set({ error: "LOCATION_ERROR", loading: false });
    }
  },

  loadWeatherByCity: async (city) => {
    set({ loading: true, error: null });

    if (!(await isOnline())) {
      set({ error: "OFFLINE", loading: false });
      return;
    }

    try {
      const weather = await fetchWeatherByCity(city);

      set({
        searchWeather: weather,
        loading: false,
      });
    } catch (e) {
      if (e instanceof CityNotFoundError) {
        set({ error: "CITY_NOT_FOUND", loading: false });
      } else {
        set({ error: "NETWORK_ERROR", loading: false });
      }
    }
  },
}));
