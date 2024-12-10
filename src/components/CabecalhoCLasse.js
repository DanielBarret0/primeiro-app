import React, { Component } from 'react'

export default class CabecalhoCLasse extends Component {
  render() {
    return (
        <header>
        <h1>React APP (Classe)</h1>
        {this.props.children}
      </header>
    )
  }
}
