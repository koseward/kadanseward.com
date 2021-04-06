const gridList = document.querySelectorAll('.grid-item')
const gridArr = Array.from( gridList )

let numLightSquares = 25;

const optimalTurns = 10
let randIndex
let randNum
let randArr
for( randIndex = 0; randIndex < optimalTurns; randIndex++ ){
  randNum = Math.floor(Math.random() * (gridArr.length - 1))
  randArr = findNeighbors( randNum );
  toggleLight( gridList[ randNum ] )
  for( const neighbor of randArr){
    toggleLight( neighbor )
  }
}


let itemNum
for( itemNum = 0; itemNum < gridArr.length; itemNum++ ){

  gridArr[ itemNum ].addEventListener('click', function(e){
    let num
    let index
    for( num = 0; num < gridArr.length; num++ ){
      if (gridArr[ num ] == e.target){
        index = num;
      }
    }
    const neighborArr = findNeighbors( index );
    toggleLight( e.target )
    for( const neighbor of neighborArr){
      toggleLight( neighbor )
    }
    if( numLightSquares == 0 ){
      window.alert("Good Job! You did it or whatever...")
    }
  })
}
function toggleLight( gridElement ){
  if (gridElement.classList.contains('js-off')) {
    gridElement.classList.remove('js-off')
    numLightSquares++
  }
  else{
    gridElement.classList.add('js-off')
    numLightSquares--
  }
}

function findNeighbors( itemIndex )
{
  let  topNeighbor = itemIndex - 5;
  let  rightNeighbor = itemIndex + 1;
  let  botNeighbor = itemIndex + 5;
  let  leftNeighbor = itemIndex - 1;
  let neighborArr = []

  if( topNeighbor >= 0 ){
    neighborArr.push( gridArr[topNeighbor] )
  }

  if( rightNeighbor % 5 != 0 ){
    neighborArr.push( gridArr[rightNeighbor] )
  }

  if( botNeighbor <= 24 ){
    neighborArr.push( gridArr[botNeighbor] )
  }

  if( itemIndex % 5 != 0 ){
      neighborArr.push( gridArr[leftNeighbor] )
  }

  return neighborArr
}
