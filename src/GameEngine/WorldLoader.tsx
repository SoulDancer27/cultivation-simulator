import { defaultAutosaveInterval } from "GameConstants/Constants";
import React from "react";
import GameContext, {
  GameContextType,
  gameContext,
} from "./GameContext/GameContext";
import { Activity } from "GameConstants/Activities";
import Trainings from "GameConstants/Trainings";
import Mining from "GameConstants/Mining";
import Crafting from "GameConstants/Craft";

// Wrapper for loading player save data
export default function WorldLoader(props: any) {
  const [data, setData] = React.useState(gameContext);

  const updateContext = (newData: Partial<GameContextType>) =>
    setData((data) => ({ ...data, ...newData }));
  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const gameData = localStorage.getItem("game");
    if (gameData) {
      let storageData = JSON.parse(gameData);
      // Load functions
      // !! This is atrocious, needs a rework
      storageData.trainings = storageData.trainings.map((item: Activity) => {
        const indexOf = Trainings.findIndex(
          (training) => training.name === item.name
        );
        if (indexOf !== -1 && Trainings[indexOf].time)
          item.time = Trainings[indexOf].time;
        if (Trainings[indexOf].baseStatsMulti)
          item.baseStatsMulti = Trainings[indexOf].baseStatsMulti;
        if (Trainings[indexOf].skillsMulti)
          item.skillsMulti = Trainings[indexOf].skillsMulti;
        return item;
      });
      // Load functions
      storageData.mining = storageData.mining.map((item: Activity) => {
        const indexOf = Mining.findIndex((mining) => mining.name === item.name);
        if (indexOf !== -1 && Mining[indexOf].time)
          item.time = Mining[indexOf].time;
        if (Mining[indexOf].baseStatsMulti)
          item.baseStatsMulti = Mining[indexOf].baseStatsMulti;
        if (Mining[indexOf].skillsMulti)
          item.skillsMulti = Mining[indexOf].skillsMulti;
        return item;
      });
      storageData.crafting = storageData.crafting.map((item: Activity) => {
        const indexOf = Crafting.findIndex((craft) => craft.name === item.name);
        if (indexOf !== -1 && Crafting[indexOf].time)
          item.time = Crafting[indexOf].time;
        if (Crafting[indexOf].generators)
          item.generators = Crafting[indexOf].generators;

        return item;
      });
      setData(storageData);
    }

    setLoaded(true);
  }, []);
  // Autosave
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      setData((data) => {
        localStorage.setItem("game", JSON.stringify(data));
        return data;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{ ...data, updateContext, setContext: setData }}
    >
      {loaded && props.children}
    </GameContext.Provider>
  );
}
