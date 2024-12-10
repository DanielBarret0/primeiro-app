import React, { Component } from 'react'

export default class BotaoClasse extends Component {
  constructor(props) {
    super(props);
    this.state = {contador: 0};
  }

  incrementa = () => {
    this.setState({ contador: this.state.contador + 1 });
  }

  render() {
    return (
      <div>
        <button onClick={this.incrementa}>
        Cliques Classe: {this.state.contador} 
        </button>
      </div>
    )
  }
}
