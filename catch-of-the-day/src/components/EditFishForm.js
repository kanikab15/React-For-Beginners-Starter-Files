import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish : PropTypes.shape({
      status: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };
  handleChange = (event) => {
    // this is a generalized method
    // or create refs and figure out which input was clicked
    // or create a separate method for each input update
    const updatedFish = {
                      ...this.props.fish,
                      [event.currentTarget.name] : event.currentTarget.value
                    };
    this.props.updateFish(this.props.index, updatedFish);
  }
  render(){
    return (
      <div className="fish-edit">
        <form className="fish-edit" onSubmit={this.createFish}>
          <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} ref={this.nameRef}/>
          <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} ref={this.priceRef}/>
          <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status} ref={this.statusRef}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} ref={this.descRef}>
          </textarea>
          <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} ref={this.imageRef}/>
          <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
        </form>
      </div>
    );
  }
}

export default EditFishForm;
