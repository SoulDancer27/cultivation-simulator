import React from 'react';

export type PlayerContextType = {
    age: number;
    health: number;
    defence: number;
    attack: number;
}

export const playerContext: PlayerContextType = {
    age: 0,
    health: 10,
    defence: 0,
    attack: 1
}

/** Context initializator */
export const PlayerContext = React.createContext({
    ...playerContext,
    updateContext: (newData: Partial<PlayerContextType>) => {},
    setContext: (value: React.SetStateAction<PlayerContextType>) => {},
  });
  
  export default PlayerContext;