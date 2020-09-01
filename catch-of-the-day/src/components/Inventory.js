import React from 'react';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
state = {
  uid: null,
  owner: null
}
componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      this.authHandler({user});
    }
  })
}
authHandler = async(authData) => {
  //1. Look up the current store in the firebase database
  const store = await base.fetch(this.props.storeId, {context: this});
  //2. Claim it if there is no owner
  if(!store.owner){
    //save it as our own
    await base.post(`${this.props.storeId}/owner`, {
      data: authData.user.uid
    });
  }
  //3. Set the state of the inventory component to reflect the current user
  this.setState({
    uid: authData.user.uid,
    owner: store.owner || authData.user.uid
  })
}
authenticate= (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    console.log("logging out");
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }

  render(){
    const logout = <button onClick={this.logout}>Log Out!</button>
    //Check if someone is logged in
    if(!this.state.uid){
      return (<Login authenticate={this.authenticate}></Login>);
    }
    //Check if they are not the store owner
    if(this.state.uid !== this.state.owner){
      return (
        <div>
            <p>Sorry you are not the owner!</p>
            {logout}
        </div>)
    }
    // they must be the owner, just render out the inventory
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) =>
          <EditFishForm
            key={key}
            fish={this.props.fishes[key]}
            index={key}
            updateFish={this.props.updateFish}>
          </EditFishForm>)}
        <AddFishForm addFish={this.props.addFish}></AddFishForm>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>

    );
  }
}

export default Inventory;
