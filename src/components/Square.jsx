import React from "react"

const TURNS = {
    X: '×',
    O: 'o'
}
  
const Square = ({ children, updateBoard, index, isSelected}) => {
    const classes = 'border-2 border-black h-32 w-32 flex justify-center items-center text-5xl '
     + `${isSelected ? 'bg-yellow-200' : ''} ${children == TURNS.O ? 'text-red-500' : 'text-blue-400'}`
    const handleClick = () => {
      updateBoard(index)
    }
    
    return(
      <div onClick={handleClick} 
      className={classes}>
        {children}
      </div>
    )
}
export default Square