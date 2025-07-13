import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import { io } from "socket.io-client";
import {config} from "../../../../shared/lib";

const socket = io(config.BASE_URL);

interface Props {
  tgUserId:number
  setScore: Dispatch<SetStateAction<number>>
  score: number
}

export const ScoreCounter= ({ tgUserId, setScore, score }:Props) => {

  const [ updated, setUpdated ] = useState(score)

  useEffect(() => {

    const handleScoreUpdate = ({ score }: { score: number }) => {
      setUpdated(score)
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
    setScore(prevState => prevState + 1)
    socket.emit("incrementScore", { tgUserId });
  };

  return {increment,score:updated}
};

