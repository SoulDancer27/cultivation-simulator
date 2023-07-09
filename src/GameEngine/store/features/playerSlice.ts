import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { year } from "GameConstants/Constants";
import { CultivationRealm } from "GameConstants/Cultivation/CultivationRealms";
import { EnemyType } from "GameConstants/Fighting/Enemies";
import {
  PlayerBaseStats,
  PlayerCurrentStats,
  baseStats,
  currentStats,
} from "GameConstants/Player";

/** Player states */

/** PLyer doing nothing */
export type IdleState = {
  action: "idle";
};

/** Player fighting an enemy */
export type FightingState = {
  action: "fighting";
  enemy: PlayerEnemyType;
};
export type PlayerEnemyType = EnemyType & {
  currentStats: { health: number };
};

/** PLayer attempting a breakthrough */
export type BreakthroughState = {
  action: "breakthrough";
  realm: RealmTribulation;
};
export type RealmTribulation = {
  id: string;
  stats: {
    health: number;
    attack: number;
    defence: number;
    healthRegen: number;
  };
  currentStats: {
    health: number;
  };
};

/** Player learning a manual */
export type CultivatingState = {
  action: "cultivating";
  manual_id: string;
};

/** Player working on activity */
export type ActivityState = {
  action: "activity";
  activity: { id: string; source: string };
};

/** Union type for all of the possible player states */
export type PlayerState =
  | IdleState
  | FightingState
  | BreakthroughState
  | CultivatingState
  | ActivityState;

/** Player state for the redux store */
export interface PlayerStateSlice {
  /** player age is a number in milliseconds */
  age: number;
  /** player stat values are calculated based on these and modifiers */
  baseStats: PlayerBaseStats;
  /** player stats that can have a value between min and max, like hp, mana etc */
  currentStats: PlayerCurrentStats;
  /** current cultivation realm index */
  cultivation: number;
  /** player state for the game managers */
  state: PlayerState;
}

const initialState: PlayerStateSlice = {
  age: 10 * year,
  baseStats,
  currentStats,
  cultivation: 0,
  state: { action: "idle" },
};

/** Slice for the redux store, contains player stats data */
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    /** updates player age as time passes */
    changePlayerAge: (state, action: PayloadAction<number>) => {
      state.age += action.payload;
    },
    /** changes player state to idle */
    startIdle: (state) => {
      state.state = { action: "idle" };
    },
    /** changes player state to start an activity */
    startActivity: (
      state,
      action: PayloadAction<{ id: string; source: string }>
    ) => {
      const { id, source } = action.payload;
      state.state = { action: "activity", activity: { id, source } };
    },
    /** changes player state to start a fight */
    startFighting: {
      reducer(state, action: PayloadAction<PlayerEnemyType>) {
        const enemy = action.payload;
        state.state = { action: "fighting", enemy };
      },
      prepare(enemy: EnemyType) {
        return {
          payload: { ...enemy, currentStats: { health: enemy.stats.health } },
        };
      },
    },
    /** changes player state to start learning a manual */
    startCultivating(state, action: PayloadAction<string>) {
      state.state = { action: "cultivating", manual_id: action.payload };
    },
    /** changes player state to start a realm breakthrough */
    startBreakthrough: {
      reducer(state, action: PayloadAction<RealmTribulation>) {
        state.state = { action: "breakthrough", realm: action.payload };
      },
      prepare(realm: CultivationRealm) {
        return {
          payload: {
            id: realm.name,
            stats: realm.baseStats,
            currentStats: { health: realm.baseStats.health },
          },
        };
      },
    },
  },
});

export const { changePlayerAge } = playerSlice.actions;

export default playerSlice.reducer;
