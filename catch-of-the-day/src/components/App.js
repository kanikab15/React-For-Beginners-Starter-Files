import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state= {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const orderString = localStorage.getItem(this.props.match.params.storeId);
    if(orderString)
      this.setState({order: JSON.parse(orderString)});
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate(){
    //if the component is updated then
    //store the order in localStorage against the store name as key
    localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.order))
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({fishes: fishes});
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes: fishes});
  }

  deleteFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;// so that firebase deletes it
    this.setState({fishes: fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({order: order});
  }

  deleteFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key]; // since it's not mirrored to firebase
    this.setState({order: order});
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the day"></Header>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map( key =>
              <Fish
                key={key}
                identifier={key} //because no way to access 'key' of a component in React
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}>
              </Fish>)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}></Order>
        <Inventory addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}>
        </Inventory>
      </div>
    )
  }
}

export default App;
