import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { blueGrey, green, yellow } from '@mui/material/colors';
import MainCard from './Card';

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store';
import { myCardsFetched } from './store/myCards.slice';
import { Card } from './store/types';
import { dropCards } from './store/myCards.slice';
import { temp_setDroppedCards } from './store/droppedCards.slice';
import { Player, playersFetched, setPlayerTurn } from './store/players.slice';

function* setNextTurn(players: Player[]) {
  let i = 0;
  const playersLen = players.length;
  while (true) {
    yield players[i].id;

    i++;

    if (i === playersLen) {
      i = 0;
    }
  }
}

function App() {
  const myCards: Card[] = useSelector((state: RootState) => state.myCards);
  const droppedCards: Card[] = useSelector((state: RootState) => state.droppedCards);
  const players: { players: Player[], playerTurn: string } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<Card[]>([]);
  const nextTurn = useRef<IterableIterator<string>>();
  
  const addMockCards = useCallback(
    () => dispatch(myCardsFetched(
      ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].map(value => ({value, family: 'Spade'}))
      )), [dispatch])

  const handleDropCards = (cards: Card[]) => {
    dispatch(dropCards(cards));
    dispatch(temp_setDroppedCards(cards));
    setSelected([]);

    if (!nextTurn || !nextTurn.current) return;
    const turnOf = nextTurn.current.next().value;

    dispatch(setPlayerTurn(turnOf));
  };

  const handleCardSelect = (cardID: number) => {
    if (isSelected(myCards[cardID])) {
      const card = myCards[cardID];
      return setSelected(selected.filter(s => s.value !== card.value || s.family !== card.family));
    }
    setSelected([...selected, myCards[cardID]]);
  }

  const isSelected = (card: Card) => {
    return selected.findIndex(s => s.value === card.value && s.family === card.family) > -1;
  }

  useEffect(()=> {
    const mockPlayers = [{name: 'drix', id:'1'}, {name: 'karl', id: '2'}, {name:'des', id: '3'}, {name: 'marcicar', id: '4'}];
    addMockCards();
    dispatch(playersFetched(mockPlayers));

    nextTurn.current = setNextTurn(mockPlayers);

    if (!nextTurn || !nextTurn.current) return;
    const turnOf = nextTurn.current.next().value;
    dispatch(setPlayerTurn(turnOf));
  }, [addMockCards, dispatch]);

  return (
    <>
    <Box sx={theme => ({backgroundColor: green[900], padding: theme.spacing(2), paddingBottom: theme.spacing(6)})}>
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
            {players.players.map(p => (
              <Grid item key={`player-${p.id}`}>
                <Avatar sx={ players.playerTurn === p.id ? {backgroundColor: yellow[500], color: "black"}: {}}>{p.name}</Avatar>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="stretch"
            justifyContent="center"
            sx={theme => ({height: theme.spacing(16)})}
            id="board"
          >
            {droppedCards.map(i => (
            <Grid item key={`board-card-${i.value}-${i.family}`}>
              <MainCard number={i.value} family={i.family}/>
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
              <Button
                variant="contained"
                color="success"
                onClick={()=>handleDropCards(selected)}
                fullWidth
                >
                Drop Cards
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="secondary" fullWidth>
                Pass
              </Button>
            </Grid>
            {/* <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Pick cards
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Swap Cards
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
        {/* Player Cards */}
        <Grid item>
          <Grid container direction="row" spacing={2} justifyContent="center" sx={theme => ({padding: theme.spacing(1)})}>
            {myCards.map((card, idx) => (
              <Grid item key={`player-deck-${idx}`}>
                <MainCard
                  number={card.value}
                  family={card.family}
                  isSelected={isSelected(card)}
                  onClick={() => handleCardSelect(idx)}
                  />
            </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
