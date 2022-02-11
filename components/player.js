import React from 'react';
import { Card, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';

// TODO fix card spanning issue
// Add coin count to component
// Add statful card info
// Add influence loss placeholder
// Add animation card reveal and discard animation

export default function Player(props) {
  return (
    <Card
      sx={{
        whiteSpace: 'nowrap',
        bgcolor: props.isActiveUser && 'primary.main',
      }}
    >
      <Typography sx={{ fontSize: 18 }} color={props.color} gutterBottom>
        {props.userName}
      </Typography>
      <Typography sx={{ fontSize: 18 }} gutterBottom>
        {props.coinCount}
      </Typography>
      <CardMedia
        sx={{
          ...props.style,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'inline',
          width: 'auto',
        }}
        component='img'
        image={props.cardOne}
      />
      <CardMedia
        sx={{
          ...props.style,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'inline',
          width: 'auto',
        }}
        component='img'
        image={props.cardTwo}
      />
    </Card>
  );
}

Player.defaultProps = {
  coinCount: null,
  cardTwo: null,
  cardOne: null,
  style: { height: '23.5vh' },
};
