import { ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import React from 'react';
import Player from "Player";

// Update interval in milliseconds
const defaultUpdateInterval = 100;

type GameTimer = {
    previousTime: number;
    currentTime: number;
}

export default function App() {
  // Character data
  const [player, setPlayer] = React.useState<Player>({age: 0});
  function updatePlayer(newData){ setPlayer(player => ({...player, ...newData}))};

  // Game timers
  const startTime = Date.now();
  const [gameTimer, setGameTimer] = React.useState<GameTimer>({previousTime: startTime, currentTime: startTime});
  // Initializing the game loop
  React.useEffect(()=>{
      // update the timers
      const interval = setInterval(()=>{
          setGameTimer(gameTimer => ({previousTime: gameTimer.currentTime, currentTime: Date.now()}));
      }, defaultUpdateInterval);
      // clears the timer on component unmount to prevent memory leak
      return () => {
          clearInterval(interval);
        };
  }, []);

  // Updating player data
  React.useEffect(()=>{
    const newAge = player.age + gameTimer.currentTime - gameTimer.previousTime; 
    updatePlayer({age: newAge});
  }, [gameTimer]);
  
  return (
    <ThemeProvider theme={LightTheme}>
      <div>Nameless Cultivator</div>
      <div>Age: {player.age}</div>
    </ThemeProvider>
  );
}
