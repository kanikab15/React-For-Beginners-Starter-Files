import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object,
    fishes: PropTypes.object,
    deleteFromOrder: PropTypes.func
  };
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames:"order",
      key :key,
      timeout:{enter:500, exit: 250}
    };

    // to ensure nothing is displayed when fish are being fetched from
    // firebase
    if(!fish) return null;

    if(isAvailable)
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{enter:500, exit: 500}}>
                  <span>{count} </span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(fish.price * count)}
              <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
            </span>
          </li>
        </CSSTransition>
      )
      else
        return (
          <CSSTransition {...transitionOptions}>
            <li key={key}>
              Sorry {(fish? fish.name : 'Fish')} is no longer available
            </li>
          </CSSTransition>
        )
  }

  render(){
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable)
        return prevTotal + fish.price * count;
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

    )
  }
}

export default Order;
