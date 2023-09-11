import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const TURNS = {
  X: '×',
  O: 'o'
}


const Square = ({ children, updateBoard, index, isSelected}) => {
  const classes = `square ${isSelected ? 'turn-show' : ''} ${children}`
  const handleClick = () => {
    updateBoard(index)
  }
  
  return(
    <div onClick={handleClick} className={classes}>
      {children}
    </div>
  )
}


const winnerCombos = [
  [0,1,2], [3,4,5], [6,7,8], //horizontales 
  [0,3,6], [1,4,7], [2,5,8], //verticales 
  [0,4,8], [2,4,6]//diagonales 
]




function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {
    // evitar sobreescribir y chequear si ya gano alguien
    if(board[index] || winner) return

    // se crea un nuevo tablero copia del estado original
    const newBoard = [... board]
    // esta modificando al valor, y no creando uno nuevo
    // const newBoard = board
    
    // se marca con x u o en el square 
    newBoard[index] = turn

    // se cambia el estado del tablero por el nuevo tablero
    setBoard(newBoard)

    // determina cual es el siguiente turno y actualiza su estado
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
  }

  // reinicia el juego de 0
  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
      <h1>Tic tac toe</h1>
      
      <main className='board'>
        <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square key={index}
                  index={index}
                  updateBoard={updateBoard}
                  >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <div className='reset'>
          <button onClick={resetBoard}>Empezar de nuevo</button>
        </div>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false ? 'Empate' : `Gano: ${winner}` 
                  }
                </h2>
              </div>
            </section>
          )
        }

      </main>
    </>
  )
}

export default App
