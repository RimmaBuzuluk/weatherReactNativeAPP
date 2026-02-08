type ImageSource = ReturnType<typeof require>;

type WeatherTheme = {
  icon: ImageSource;
  backgroundColor: string;
  textColor: string;
};
export const weatherIcons: Record<string, WeatherTheme> = {
  Clear: {
    icon: require("../assets/images/sun.png"),
    backgroundColor: "#FFB703",
    textColor: "#ffffffff",
  },

  Clouds: {
    icon: require("../assets/images/cloudy.png"),
    backgroundColor: "#3A86FF",
    textColor: "#FFFFFF",
  },

  Rain: {
    icon: require("../assets/images/rain.svg"),
    backgroundColor: "#1D3557",
    textColor: "#FFFFFF",
  },

  Drizzle: {
    icon: require("../assets/images/drizzle.svg"),
    backgroundColor: "#2A9D8F",
    textColor: "#FFFFFF",
  },

  Thunderstorm: {
    icon: require("../assets/images/thunderstorm.svg"),
    backgroundColor: "#6A4C93",
    textColor: "#FFFFFF",
  },

  Snow: {
    icon: require("../assets/images/snow.png"),
    backgroundColor: "#1e90ff",
    textColor: "#ffffff",
  },

  Mist: {
    icon: require("../assets/images/mist.svg"),
    backgroundColor: "#8D99AE",
    textColor: "#FFFFFF",
  },

  Smoke: {
    icon: require("../assets/images/smoke.svg"),
    backgroundColor: "#5C677D",
    textColor: "#FFFFFF",
  },

  Haze: {
    icon: require("../assets/images/haze.svg"),
    backgroundColor: "#BC6C25",
    textColor: "#FFFFFF",
  },

  Dust: {
    icon: require("../assets/images/dust.svg"),
    backgroundColor: "#D4A373",
    textColor: "#1B1B1B",
  },

  Fog: {
    icon: require("../assets/images/foggy.svg"),
    backgroundColor: "#6C757D",
    textColor: "#FFFFFF",
  },

  Sand: {
    icon: require("../assets/images/sand.svg"),
    backgroundColor: "#E9C46A",
    textColor: "#173786ff",
  },

  Ash: {
    icon: require("../assets/images/ash.svg"),
    backgroundColor: "#495057",
    textColor: "#FFFFFF",
  },

  Squall: {
    icon: require("../assets/images/squall.svg"),
    backgroundColor: "#264653",
    textColor: "#FFFFFF",
  },

  Tornado: {
    icon: require("../assets/images/tornado.svg"),
    backgroundColor: "#2B2D42",
    textColor: "#FFFFFF",
  },
};
