import { Box, Typography } from '@mui/material';
import PlayerContext from 'Context/PlayerContext/PlayerContext';
import React from 'react';

export default function PlayerStatsPane(){
    const {age, health, attack, defence} = React.useContext(PlayerContext);
    return <Box>
        <Typography>Nameless Cultivator</Typography>
        <Typography>Age: {age}</Typography>
        <Typography>Hp: {health}</Typography>
        <Typography>Atk: {attack}</Typography>
        <Typography>Def: {defence}</Typography>
    </Box>
}