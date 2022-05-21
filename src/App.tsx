import React from 'react';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { blueGrey, green, yellow } from '@mui/material/colors';
import MainCard from './Card';

function App() {
  return (
    <>
    <Box sx={theme => ({backgroundColor: green[900], padding: theme.spacing(2), paddingBottom: theme.spacing(4)})}>
      <Grid
        container
        className="app"
        direction="column"
        spacing={4}
      >
        <Grid item>
          <Grid 
            container 
            direction="row" 
            spacing={2}
            alignItems="center"
          >
          <Grid item>
            <Typography variant="h6" color="white">Turn:</Typography>
          </Grid>
            <Grid item>
              <Avatar>DL</Avatar>
            </Grid>
            <Grid item>
              <Avatar>DL</Avatar>
            </Grid>
            <Grid item>
              <Avatar sx={{backgroundColor: yellow[500], color: "black"}}>DL</Avatar>
            </Grid>
            <Grid item>
              <Avatar>DL</Avatar>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="stretch"
            justifyContent="space-around"
            sx={{height: '100%'}}
            id="board"
          >
            {[5,10,'J',3,2].map(i => (
            <Grid item key={`board-card-${i}`}>
              <MainCard number={i}/>
            </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
      {/* Button Controls */}
      <Grid
        container
        className="app"
        direction="column"
        spacing={2}
        sx={{backgroundColor: blueGrey[900]}}
      >
        <Grid item>
          <Grid container direction="row" spacing={2} padding={2}>
            <Grid item xs={8}>
              <Button variant="contained" color="success" fullWidth>
                Drop Cards
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="secondary" fullWidth>
                Pass
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Pick cards
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Swap Cards
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* Player Cards */}
        <Grid item>
          <Grid container direction="row" spacing={2} justifyContent="space-evenly" sx={theme => ({padding: theme.spacing(1)})}>
            {[3,5,7,4,8,6,4,3,3,4,5,4,8].map((i, idx) => (
              <Grid item key={`player-deck-${idx}`}>
                <MainCard number={i}/>
            </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
