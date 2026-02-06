export const getUserCoords = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  if (typeof window !== "undefined" && "geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Browser geolocation error:", error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  } else {
    throw new Error("Geolocation is not available in this browser");
  }
};
