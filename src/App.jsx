import { useState } from 'react'
import Square from './components/Square'

const TURNS = {
  X: '×',
  O: 'o'
}

const winnerCombos = [
  [0,1,2], [3,4,5], [6,7,8], //horizontales 
  [0,3,6], [1,4,7], [2,5,8], //verticales 
  [0,4,8], [2,4,6]//diagonales 
]

function App() {
  // estados
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  // checkear ganador
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

  // checkear si el tablero esta lleno
  const checkFull = (boardToCheck) => {
    for (const square of boardToCheck){
      if (square === null){
        // Si hay al menos una casilla vacía, no es un empate
        return false;
      }
    }
    return true;
  }

  // actualizar el tablero con el ultimo movimiento
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
    } else{
      const isFull = checkFull(newBoard)
      if(isFull){
        setWinner(false)
      }
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
      <section>
        <h1 className='text-center'>Tic tac toe</h1>
      </section>

      <section>
        {
          turn === TURNS.X && (
            <h2 className='text-center text-red-500'>Player X turn</h2>
          )
        }
        {
          turn === TURNS.O &&(
            <h2 className='text-center text-blue-400'>Player O turn</h2>
          )
        }
      </section>

      <main className='p-3 flex flex-col'>
        <section className='grid grid-cols-3 gap-2 m-auto'>
          {
            board.map((_, index) => {
              return (
                <Square key={index}
                  index={index}
                  updateBoard={updateBoard}
                  turns={TURNS.O}
                  >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <div className='w-full flex justify-center mt-5'>
          <button onClick={resetBoard} className='bg-black text-white p-4 rounded-3xl hover:bg-gray-800 '>Empezar de nuevo</button>
        </div>

        {
          winner !== null && (
            <section className='m-auto mt-5'>
              <div className=''>
                <h2 className= {`text-6xl ${winner === TURNS.O ? 'text-red-500' : winner === TURNS.X ? 'text-blue-500' : ''}`}>
                  {
                    winner === false ? `EMPATE` : `GANÓ: ${winner}` 
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
