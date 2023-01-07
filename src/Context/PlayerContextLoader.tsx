import React from 'react';
import PlayerContext, { playerContext, PlayerContextType } from './PlayerContext/PlayerContext';

// Wrapper for loading player save data
export default function PlayerContextLoader(props: any){
    const [player, setPlayer] = React.useState(playerContext);
      /** Updates player context using shallow merge of UserContext attributes. */
  const updateContext = (newData: Partial<PlayerContextType>) => setPlayer((data) => ({ ...data, ...newData }));

  return (
    <PlayerContext.Provider value={{ ...player, updateContext, setContext: setPlayer }}>
      {props.children}
    </PlayerContext.Provider>
  );
}