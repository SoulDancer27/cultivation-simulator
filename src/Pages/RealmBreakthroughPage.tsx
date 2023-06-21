import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";
import BreakthroughAnimation from "./RealmBreakthroughPage/BreakthroughAnimation";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import getSpacing from "Utils/getSpacing";
import calculateRealmPower from "GameEngine/shared/calculateRealmPower";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Placeholder from "./RealmBreakthroughPage/Placeholder";
import calculateMaxTribulationStage from "./RealmBreakthroughPage/calculateMaxTribulationStage";
import { HtmlTooltip } from "Components";
import { PlayerContext, GameContext } from "GameEngine";
import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";

// ! Some bad coding ahead. Probably should split into several files :)
export default function RealmBreakthroughPage() {
  const theme = useTheme();
  const player = React.useContext(PlayerContext);
  const { realm } = player;
  const { cultivationRealms, updateContext: updateGameContext } =
    React.useContext(GameContext);

  const nextRealmIndex =
    cultivationRealms.length >= realm.index + 2 ? realm.index + 1 : undefined;
  const { height } = getWindowDimensions();

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
      statMulti: r.tribulation.stepReached
        ? r.tribulation.statsMulti ** r.tribulation.stepReached
        : 1,
      tribulationMulti: r.tribulation.stepReached
        ? r.tribulation.multiplier ** r.tribulation.stepReached
        : 1,
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

  const currentPower = calculateRealmPower(realm.index, cultivationRealms);

  if (!nextRealmIndex)
    return (
      <Placeholder
        currentPower={currentPower}
        PassedTribulations={PassedTribulations}
      ></Placeholder>
    );

  // Tribulation logic
  const nextRealm = cultivationRealms[nextRealmIndex];
  const power = calculateTribulationPower(nextRealmIndex, cultivationRealms);
  const parse = useNumberParser();
  const { healthRegen, attack, defence, health } = power;

  const { state, updateContext } = React.useContext(PlayerContext);
  const isActive = state.action === "breakthrough";
  const currentHealth = nextRealm.currentStats?.currentHealth || health;
  const handleClick = () => {
    if (isActive) {
      state.action = "idle";
      state.realm = undefined;
      // Reset last tribulation state
      cultivationRealms[nextRealmIndex].currentStats = undefined;
      if (cultivationRealms[nextRealmIndex].tribulation)
        (cultivationRealms[nextRealmIndex] as any).tribulation.stepReached =
          undefined;
    } else {
      state.action = "breakthrough";
      state.realm = { index: nextRealmIndex };
      const { health, healthRegen, attack, defence } = nextRealm.baseStats;
      cultivationRealms[nextRealmIndex].currentStats = {
        health,
        currentHealth: health,
        healthRegen,
        attack,
        defence,
      };
      if (cultivationRealms[nextRealmIndex].tribulation)
        (cultivationRealms[nextRealmIndex] as any).tribulation.stepReached = 0;
    }
    updateContext({ state });
    updateGameContext({ cultivationRealms: cultivationRealms.slice() });
  };

  // Cultivation realm power to display

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
              {PassedTribulations.map((item) => {
                return (
                  <HtmlTooltip
                    key={item.name}
                    title={
                      <>
                        <Typography>Multipliers:</Typography>
                        <Typography>
                          Player stats: {parse(item.statMulti)}
                        </Typography>
                        <Typography>
                          Tribulation power: {parse(item.tribulationMulti)}
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
                progress={health ? (health - currentHealth) / health : 0}
                isHeavenly={nextRealm.tribulation?.stepReached ? true : false}
              />
            </Box>

            <Box marginLeft={theme.spacing(4)}>
              <Typography variant="h6">Tribulation power:</Typography>
              <Typography>Hp: {parse(currentHealth)}</Typography>
              <Typography>Hp.regen: {parse(healthRegen)}</Typography>
              <Typography>Atk: {parse(attack)}</Typography>
              <Typography>Def: {parse(defence)}</Typography>
              <Typography variant="h6">
                {nextRealm.tribulation
                  ? `Tribulation stage: ${
                      nextRealm.tribulation.stepReached || 0
                    }/${nextRealm.tribulation.steps}`
                  : ""}
              </Typography>
              <Typography variant="h6">
                {nextRealm.tribulation
                  ? `Power multi: ${
                      nextRealm.tribulation.stepReached
                        ? parse(
                            TotalTribulations.tribulationMulti *
                              nextRealm.tribulation.multiplier **
                                nextRealm.tribulation.stepReached
                          )
                        : 1
                    }`
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box marginY={theme.spacing(2)}>
          <Button variant="outlined" onClick={handleClick} size={"large"}>
            {!isActive ? "Breakthrough" : "Stop"}
          </Button>
          {nextRealm.tribulation && !isActive && (
            <Typography>
              estim. stage{" "}
              {calculateMaxTribulationStage({
                player,
                cultivationRealms,
                nextRealmIndex,
              })}
            </Typography>
          )}
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
            <Typography>Health x {parse(currentPower.health)}</Typography>
            <Typography>
              Health regen x {parse(currentPower.healthRegen)}
            </Typography>
            <Typography>Attack x {parse(currentPower.attack)}</Typography>
            <Typography>Defence x {parse(currentPower.defence)}</Typography>
            <Typography>Insight x {parse(currentPower.insight)}</Typography>
          </Box>
          <ArrowForwardIcon fontSize={"large"} />
          <Box>
            <Typography>Health x {parse(nextPower.health)}</Typography>
            <Typography>
              Health regen x {parse(nextPower.healthRegen)}
            </Typography>
            <Typography>Attack x {parse(nextPower.attack)}</Typography>
            <Typography>Defence x {parse(nextPower.defence)}</Typography>
            <Typography>Insight x {parse(nextPower.insight)} </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
