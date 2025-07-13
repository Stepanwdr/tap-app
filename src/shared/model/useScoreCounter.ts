import { useEffect } from "react";
import { io } from "socket.io-client";
import { config } from "../lib";
import { useStoreUser } from "./useUserStore.ts";

const socket = io( config.BASE_URL );


export const useScoreCounter= ({tgUserId}:{tgUserId:number}) => {

  const { setCoin, user } = useStoreUser()
  useEffect(() => {

    const handleScoreUpdate = ({ coin }: { coin: number }) => {
      setCoin(coin)
    };

    const handleError = (msg: string) => {
      alert(msg);
    };

    socket.on("scoreUpdated", handleScoreUpdate);
    socket.on("errorMessage", handleError);


    return () => {
      socket.off("scoreUpdated", handleScoreUpdate);
      socket.off("errorMessage", handleError);
    };
  }, []);

  const increment = () => {
    socket.emit("incrementScore", { tgUserId:user?.tgUserId || tgUserId });
  };

  return { increment }
};
