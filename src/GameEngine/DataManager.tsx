import { defaultAutosaveInterval } from "GameConstants/Constants";
import { saveStoreData } from "GameEngine/store/store";
import React from "react";
import { useAppDispatch } from "./store/hooks";

export default function DataManager(props: any) {
  const dispatch = useAppDispatch();
  /** Autosave game data periodically and before page is closed */
  React.useEffect(() => {
    const saveGameData = () => dispatch(saveStoreData());
    const autosaveInterval = setInterval(saveGameData, defaultAutosaveInterval);
    window.onbeforeunload = saveGameData;
    return () => {
      clearInterval(autosaveInterval);
      window.onbeforeunload = null;
    };
  }, []);
  return <>{props.children}</>;
}
