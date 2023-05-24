import React from "react";
import SettingsContext, {
  SettingsContextType,
  settingsContext,
} from "./SettingsContext/SettingContext";
import { accessCookie, createCookie } from "Utils/Cookie";
import { defaultUpdateInterval } from "GameConstants/Constants";

export default function SettingsContextLoader(props: any) {
  const [settings, setSettings] = React.useState(settingsContext);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  /** Updates context using shallow merge of SettingsContext attributes. */
  const updateContext = (newData: Partial<SettingsContextType>) =>
    setSettings((data) => ({ ...data, ...newData }));

  // Load settings values from cookies
  React.useEffect(() => {
    try {
      let tickrate: any = accessCookie("tickrate");
      let gameSpeed: any = accessCookie("gamespeed");
      let notation: any = accessCookie("notation");
      if (tickrate) tickrate = Number(tickrate);
      if (gameSpeed) gameSpeed = Number(gameSpeed);
      setSettings({
        tickRate: tickrate || Math.floor(1000 / defaultUpdateInterval),
        gameSpeed: gameSpeed || 1,
        notation: notation || "trivial",
      });
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    createCookie("tickrate", settings.tickRate.toString(), 1000);
    createCookie("gamespeed", settings.gameSpeed.toString(), 1000);
    createCookie("notation", settings.notation, 1000);
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{ ...settings, updateContext, setContext: setSettings }}
    >
      {loaded && props.children}
    </SettingsContext.Provider>
  );
}
