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
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
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
        <Order fishes={this.state.fishes} order={this.state.order}></Order>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}>
        </Inventory>
      </div>
    )
  }
}

export default App;
