import { defaultAutosaveInterval } from "GameConstants/Constants";
import React from "react";
import { useSetPlayerState } from "./Player/PlayerContext";

// Wrapper for loading player save data
export default function PlayerContextLoader(props: any) {
  const setPlayerState = useSetPlayerState();

  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const playerData = localStorage.getItem("player");
    if (playerData) setPlayerState(JSON.parse(playerData));
    setLoaded(true);
  }, []);

  // Autosave
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      setPlayerState((player) => {
        localStorage.setItem("player", JSON.stringify(player));
        return player;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, []);

  return <>{loaded && props.children}</>;
}
