import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { createTheme , ThemeProvider } from '@material-ui/core';
import useStyles from './styles';

const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },});

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <Card className="cart-item">
      <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">₹{item.price.formatted}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      <ThemeProvider theme={theme}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() =>onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button"  className={classes.button} onClick={() => onRemoveFromCart(item.id)} >Remove</Button>
        </ThemeProvider>
      </CardActions>
    </Card>
  );
};

export default CartItem;