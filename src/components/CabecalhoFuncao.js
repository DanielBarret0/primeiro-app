import React from 'react'

export default function CabecalhoFuncao(props) {
  return (
    <header>
      <h1>React APP (Func)</h1>
      {props.children}
    </header>
  )
}
