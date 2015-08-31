import React from 'react';

class Incrementor extends React.Component {
  constructor() {
    super();
    this.handleClick= this.handleClick.bind(this);
    this.state = { count: 0 };
  }

  render(){
    return (
      <div className="incrementor">
        <div className="incrementor-indicator">{this.state.count}</div>
        <button className="incrementor-button" onClick={this.handleClick}>Increment!</button>
      </div>
    );
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
}

export default Incrementor;
