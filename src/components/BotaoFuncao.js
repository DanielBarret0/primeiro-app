import { useState } from "react"

export default function BotaoFuncao(props) {

  const [contador, setContador] = useState(0);

  function incrementa() {
    setContador(contador + 1);
  }

  return (
    <div>
      <button onClick={incrementa}>
        Cliques função: {contador}
      </button>
    </div>
  )
}
