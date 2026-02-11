import { useEffect, useState } from "react";
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (Platform.OS === "web") {
      const updateOnlineStatus = () => setIsOnline(navigator.onLine);

      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      setIsOnline(navigator.onLine);

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      };
    } else {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsOnline(Boolean(state.isConnected && state.isInternetReachable));
      });

      return () => unsubscribe();
    }
  }, []);

  return isOnline;
};
