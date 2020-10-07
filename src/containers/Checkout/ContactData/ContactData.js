import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      custommer: {
        name: 'Stanimir',
        address: {
          street: 'novaVarna',
          zipCode: '9010',
          country: 'Bulgaria'
        },
        email: 'test@test.bg'
      },
      deliveryMethod: 'takeaway'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <input type="text" className={classes.Input} name="name" placeholder="Your name"></input>
        <input type="email" className={classes.Input} name="email" placeholder="Your email"></input>
        <input type="text" className={classes.Input} name="street" placeholder="Street"></input>
        <input type="text" className={classes.Input} name="postal" placeholder="Postal Code"></input>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) { form = <Spinner /> }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;