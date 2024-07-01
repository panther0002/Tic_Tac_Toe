const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
const winnerpage=document.querySelector(".winner-page");
const overlays=document.querySelector(".overlays");


let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame(){

    currentPlayer='X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI theke delete o korte hbe
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList=`box box-${index+1}`;
        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}
initGame();
//1. box e event listnter added
boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        //2
        handelClick(index);
    })
})
function handelClick(index){

    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="None";
        //2
        swapTurn();
        //3
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    //UI update
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((positions) => {
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[positions[0]] !== "" || gameGrid[positions[1]] !== "" || gameGrid[positions[2]] !== "") &&
            (gameGrid[positions[0]] === gameGrid[positions[1]] ) && (gameGrid[positions[1]] === gameGrid[positions[2]] ) ){
            // check if winner is X
            if(gameGrid[positions[0]] === "X"){
                answer = "X";
                //winner show korbo
                winnerpage.classList.add("active");
                overlays.classList.add("active");
            }
            else{
                answer = "O";
            }

            // disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            });
           
            //now we know X/O is a winner
            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");

        }
    });

    // it means we have  a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !==""){
            fillCount++;
        }
    });

    //board is Filled, game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click",initGame);

function closepage(){
    winnerpage.classList.remove("active");
    overlays.classList.remove("active");
}