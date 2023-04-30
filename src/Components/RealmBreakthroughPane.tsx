import { Box, Button, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import React from "react";
import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";
import BreakthroughAnimation from "./RealmBreakthroughPane/BreakthroughAnimation";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import getSpacing from "Utils/getSpacing";
import GameContext from "GameEngine/GameContext/GameContext";
import HtmlTooltip from "./shared/HtmlTooltip";
import calculateRealmPower from "GameEngine/shared/calculateRealmPower";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function RealmBreakthroughPane() {
  const theme = useTheme();
  const { realm } = React.useContext(PlayerContext);
  const { cultivationRealms, updateContext: updateGameContext } =
    React.useContext(GameContext);
  const currentRealm = cultivationRealms[realm.index];
  const nextRealmIndex =
    cultivationRealms.length >= realm.index + 2 ? realm.index + 1 : undefined;
  const { height } = getWindowDimensions();
  if (!nextRealmIndex) return <></>;
  // Passed tribulation statistics
  let PassedTribulations: Array<{
    name: string;
    stepReached: number;
    statMulti: number;
    tribulationMulti: number;
  }> = [];

  for (let i = 0; i <= realm.index; i++) {
    const r = cultivationRealms[i];
    if (!r.tribulation) continue;

    PassedTribulations.push({
      name: r.name,
      stepReached: r.tribulation.stepReached || 0,
      statMulti: r.tribulation.statsMulti * (r.tribulation.stepReached || 0),
      tribulationMulti:
        r.tribulation.multiplier * (r.tribulation.stepReached || 0),
    });
  }

  const TotalTribulations = {
    statMulti: 1,
    tribulationMulti: 1,
  };
  for (let i = 0; i < PassedTribulations.length; i++) {
    const trib = PassedTribulations[i];
    TotalTribulations.statMulti *= trib.statMulti || 1;
    TotalTribulations.tribulationMulti *= trib.tribulationMulti || 1;
  }

  // Tribulation logic
  const nextRealm = cultivationRealms[nextRealmIndex];
  const power = calculateTribulationPower(nextRealmIndex, cultivationRealms);
  const { healthRegen, attack, defence } = power;

  const { state, updateContext } = React.useContext(PlayerContext);
  const health = state.realm?.health || power.health;
  const isActive = state.action === "breakthrough";
  const currentHealth = state.realm?.currentHealth || health;
  const handleClick = () => {
    state.action = isActive ? "idle" : "breakthrough";
    state.realm = isActive
      ? undefined
      : {
          index: nextRealmIndex,
          currentHealth: health,
          health,
          attack,
          defence,
          healthRegen,
          tribulation: nextRealm.tribulation,
        };
    if (isActive && cultivationRealms[nextRealmIndex].tribulation)
      cultivationRealms[nextRealmIndex].tribulation!.stepReached = 0;
    updateContext({ state });
    updateGameContext({ cultivationRealms });
  };

  // Effective values to display
  let stepReached = 1;
  let multiplier = 1;
  if (state.realm?.tribulation) {
    stepReached = state.realm.tribulation.stepReached || 0;
    multiplier = state.realm.tribulation.multiplier;
  }
  const powerFactor = multiplier ** stepReached;
  const effCurrentHealth = currentHealth;
  const effHealthRegen = healthRegen * powerFactor;
  const effAttack = attack * powerFactor;
  const effDefence = defence * powerFactor;

  // Cultivation realm power to display
  const currentPower = calculateRealmPower(realm.index, cultivationRealms);
  const nextPower = calculateRealmPower(nextRealmIndex, cultivationRealms);

  return (
    <Box paddingLeft={theme.spacing(2)} paddingTop={theme.spacing(2)}>
      <Box
        height={height - getSpacing(theme, 16)}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        maxWidth={600}
      >
        <Typography variant="h4" marginBottom={theme.spacing(2)}>
          Next realm: {nextRealm.name}
        </Typography>
        {nextRealm.tribulation && (
          <HtmlTooltip
            title={
              <>
                <Typography>
                  Each completed stage provides
                  <Typography
                    component="span"
                    color={theme.palette.success.main}
                    display="inline"
                  >
                    {" "}
                    x{nextRealm.tribulation.statsMulti}{" "}
                  </Typography>
                  multiplier to all stats aIndex
                  <Typography
                    component="span"
                    color={theme.palette.error.main}
                    display="inline"
                  >
                    {" "}
                    x{nextRealm.tribulation.multiplier}{" "}
                  </Typography>
                  to all following heavenly tribulations
                </Typography>
              </>
            }
          >
            <Typography variant="h6" marginBottom={theme.spacing(2)}>
              Tribulation stages: {nextRealm.tribulation.steps}
            </Typography>
          </HtmlTooltip>
        )}
        <Box>
          <Box display="flex" alignItems={"center"}>
            <Box marginRight={theme.spacing(4)}>
              <Typography variant="h6">Passed tribulations</Typography>
              {PassedTribulations.map((item, index) => {
                return (
                  <HtmlTooltip
                    key={item.name}
                    title={
                      <>
                        <Typography>Multipliers:</Typography>
                        <Typography>Player stats: {item.statMulti}</Typography>
                        <Typography>
                          Tribulation power: {item.tribulationMulti}
                        </Typography>
                      </>
                    }
                  >
                    <Box>
                      <Typography>
                        {item.name}: {item.stepReached}
                      </Typography>
                    </Box>
                  </HtmlTooltip>
                );
              })}
            </Box>
            <Box width={100} height={400}>
              <BreakthroughAnimation
                progress={health ? (health - effCurrentHealth) / health : 0}
              />
            </Box>

            <Box marginLeft={theme.spacing(4)}>
              <Typography variant="h6">Tribulation power:</Typography>
              <Typography>Hp: {effCurrentHealth.toFixed(2)}</Typography>
              <Typography>Hp.regen: {effHealthRegen.toFixed(2)}</Typography>
              <Typography>Atk: {effAttack.toFixed(2)}</Typography>
              <Typography>Def: {effDefence.toFixed(2)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box marginY={theme.spacing(2)}>
          <Button variant="outlined" onClick={handleClick} size={"large"}>
            {!isActive ? "Breakthrough" : "Stop"}
          </Button>
        </Box>
        <Box
          border="1px solid gray"
          borderRadius={4}
          display="flex"
          alignItems={"center"}
          padding={theme.spacing(2)}
          gap={theme.spacing(4)}
        >
          <Box>
            <Typography>Health x {currentPower.health.toFixed(2)}</Typography>
            <Typography>
              Health regen x {currentPower.healthRegen.toFixed(2)}
            </Typography>
            <Typography>Attack x {currentPower.attack.toFixed(2)}</Typography>
            <Typography>Defence x {currentPower.defence.toFixed(2)}</Typography>
            <Typography>
              Insight x {currentPower.insight.toFixed(2)}{" "}
            </Typography>
          </Box>
          <ArrowForwardIcon fontSize={"large"} />
          <Box>
            <Typography>Health x {nextPower.health.toFixed(2)}</Typography>
            <Typography>
              Health regen x {nextPower.healthRegen.toFixed(2)}
            </Typography>
            <Typography>Attack x {nextPower.attack.toFixed(2)}</Typography>
            <Typography>Defence x {nextPower.defence.toFixed(2)}</Typography>
            <Typography>Insight x {nextPower.insight.toFixed(2)} </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
