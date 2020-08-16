import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state= {
    fishes: {},
    order: {}
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({fishes: fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the day"></Header>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map( key =>
              <Fish key={key} details={this.state.fishes[key]}></Fish>)}
          </ul>
        </div>
        <Order></Order>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}>
        </Inventory>
      </div>
    )
  }
}

export default App;
