import React from 'react';

export type GameContextType = {
    previousTime: number;
    currentTime: number;
}

export const gameContext: GameContextType = {
    previousTime: Date.now(),
    currentTime: Date.now()
}

/** Context initializator */
export const GameContext = React.createContext({
    ...gameContext,
    updateContext: (newData: Partial<GameContextType>) => {},
    setContext: (value: React.SetStateAction<GameContextType>) => {},
  });
  
  export default GameContext;