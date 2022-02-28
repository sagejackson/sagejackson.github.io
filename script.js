const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board")
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winneingMessageElement = document.getElementById("winning-message")
const winneingMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById("restartButton")
const WINNING_COMBNINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circleTurn

startGame()

restartButton.addEventListener("click", startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBordedHoverClass()
    winneingMessageElement.classList.remove("show")

}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBordedHoverClass()
    }

}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw){
    if(draw){
        winneingMessageTextElement.innerText = "Draw!"
    }
    else{
        winneingMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"}  WIN!`
    }
    winneingMessageElement.classList.add("show")

}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)

}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBordedHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentclass){
    return WINNING_COMBNINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentclass)
        })
    })


}
