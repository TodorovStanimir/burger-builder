import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get('orders.json')
      .then(response => {
        const fetchedOrders = Object.keys(response.data)
          .map(key => { return { ...response.data[key], id: key } });
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      })
  }
  render() {
    const orders = this.state.loading
      ? <Spinner />
      : this.state.orders.map(order => <Order order={order} />)
    return (
      <div>
        {orders}
      </div>
    )
  };
};

export default ErrorHandler(Orders, axios);