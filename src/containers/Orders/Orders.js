import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true
  // }
  componentDidMount() {
    // axios.get('orders.json')
    //   .then(response => {
    //     const fetchedOrders = Object.keys(response.data)
    //       .map(key => { return { ...response.data[key], id: key } });
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   })
    this.props.onFetchOrders();
  }
  render() {
    const orders = this.props.loading
      ? <Spinner />
      : this.props.orders.map(order => <Order key={order.id} order={order} />)
    return (
      <div>
        {orders}
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));