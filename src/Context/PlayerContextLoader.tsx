import React from "react";
import PlayerContext, {
  playerContext,
  PlayerContextType,
} from "./PlayerContext/PlayerContext";

const defaultAutosaveInterval = 10000;

// Wrapper for loading player save data
export default function PlayerContextLoader(props: any) {
  const [player, setPlayer] = React.useState(playerContext);
  /** Updates player context using shallow merge of UserContext attributes. */
  const updateContext = (newData: Partial<PlayerContextType>) =>
    setPlayer((data) => ({ ...data, ...newData }));

  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const playerData = localStorage.getItem("player");
    if (playerData) setPlayer(JSON.parse(playerData));
    setLoaded(true);
  }, []);

  // Autosave
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      setPlayer((player) => {
        localStorage.setItem("player", JSON.stringify(player));
        return player;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{ ...player, updateContext, setContext: setPlayer }}
    >
      {loaded && props.children}
    </PlayerContext.Provider>
  );
}
