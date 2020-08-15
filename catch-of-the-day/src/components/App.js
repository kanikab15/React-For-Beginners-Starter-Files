import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

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
  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the day"></Header>
        </div>
        <Order></Order>
        <Inventory addFish={this.addFish}></Inventory>
      </div>
    )
  }
}

export default App;
