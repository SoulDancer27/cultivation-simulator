import { defaultAutosaveInterval } from "GameConstants/Constants";
import React from "react";
import { GameContextType, useSetGameState } from "./GameContext/GameContext";

// Wrapper for loading player save data
export default function WorldLoader(props: any) {
  const setGameState = useSetGameState();

  const updateContext = (newData: Partial<GameContextType>) =>
    setGameState((data) => ({ ...data, ...newData }));
  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const gameData = localStorage.getItem("game");
    if (gameData) {
      let storageData = JSON.parse(gameData);
      setGameState(storageData);
    }

    setLoaded(true);
  }, []);
  // Autosave
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      setGameState((data) => {
        localStorage.setItem("game", JSON.stringify(data));
        return data;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, []);

  return <> {loaded && props.children}</>;
}
