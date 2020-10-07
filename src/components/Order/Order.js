import React from 'react';

import classes from './Order.css';

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: {
        Object.keys(props.order.ingredients)
          .map(ing => <span key={ing} className={classes.Ingredient}>
            {ing} ({props.order.ingredients[ing]})
            </span>)
      }
      </p>
      <p>Price: <strong>BGN {Number(props.order.price).toFixed(2)}</strong></p>
    </div>
  )
};

export default Order;
