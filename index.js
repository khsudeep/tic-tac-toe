/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/


var interval
const INTERVAL_IN_SECONDS=100;
const grid = [];
const GRID_LENGTH = 7;
let compTurnSymbol='0'
let HumanTurnSymbol='X'
let turn = HumanTurnSymbol;
var countMoves = 0; 
function initializeGrid() {
    countMoves = 0;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function setTimerForHuman() {
	var seconds_left = INTERVAL_IN_SECONDS;
	interval = setInterval(function() {
		document.getElementById('timerId').innerHTML = "Your Turn: "+--seconds_left;

		if (seconds_left <= 0)
		{
			//document.getElementById('timerId').innerHTML = 'You are ready';
			clearInterval(interval);
			declareCompAsWinner();

		}
	}, 1000);
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">'+HumanTurnSymbol+'</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">'+compTurnSymbol+'</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
	clearInterval(interval);
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    let newValue = 1;
     if(turn==compTurnSymbol) {
		turn = HumanTurnSymbol;
		newValue = 2;
    } else {
	turn = compTurnSymbol;
    }
    grid[colIdx][rowIdx] = newValue;
    countMoves++;
    renderMainGrid();
    addClickHandlers();
    setTimeout(function(){if(!checkResult())
    	compTurn();},20);
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkResult() {

	if(checkDiagonalResults() || checkColumnResults() || checkRowResults()) {
		declareWinner();
	} else {
		if(isDraw()) 
			declareDraw();
	}
}

function isDraw() {
	if(countMoves>=(GRID_LENGTH*GRID_LENGTH))
		return true;
	return false;
}

function declareDraw() {
	alert("Game Drawn");
	location.reload();
}

function declareWinner() {
	alert("Winner is "+swapTurn());
	location.reload();
}

function swapTurn() {
	if(turn==HumanTurnSymbol)
		turn=compTurnSymbol;
	else
		turn=HumanTurnSymbol;
	return turn;
}


function checkRowResults() {
	var foundFailure = false;
	for(let i=0;i<GRID_LENGTH;i++) {
		foundFailure = false;
		var firstValue = grid[i][0];
		if(firstValue==0) {
			foundFailure = true;
			continue;
		}
		for(let j=1;j<GRID_LENGTH;j++) {
			if((grid[i][j]==0) || (grid[i][j]!=firstValue)) {
				j=GRID_LENGTH;
				foundFailure=true;
				continue;
			}
		}
		if(!foundFailure) {
			return true;
		}
	}


	if(!foundFailure)
		return true;

	return false;	
}

function checkColumnResults() {
	var foundFailure = false;
	for(let i=0;i<GRID_LENGTH;i++) {
		foundFailure = false;
		var firstValue = grid[0][i];
		if(firstValue==0) {
			foundFailure = true;
			continue;
		}
		for(let j=1;j<GRID_LENGTH;j++) {
			if((grid[j][i]==0) || (grid[j][i]!=firstValue)) {
				j=GRID_LENGTH;
				foundFailure=true;
				continue;
			}
		}
		if(!foundFailure) {
			return true;
		}
	}


	if(!foundFailure)
		return true;

	return false;	
}

function checkDiagonalResults() {
	var firstValue = grid[0][0];
	var foundFailure = false;
	for(let i=0;i<GRID_LENGTH;i++) {
		if(grid[i][i]==0) {
			foundFailure=true;
			break;
		}
		if(grid[i][i]!=firstValue){
			foundFailure=true;
			break;
		}
	}
	if(!foundFailure) {
		return true;
	}
	foundFailure = false;
	firstValue = grid[GRID_LENGTH-1][GRID_LENGTH-1];
	for(let i=GRID_LENGTH-1;i>=0;i--) {
		if(grid[i][i]==0) {
			foundFailure=true;
			break;
		}
		if(grid[i][i]!=firstValue){
			foundFailure=true;
			break;
		}
	}
	if(!foundFailure) {
		return true;
	}
	return false;
}

function compTurn() {
	
	let rand = Math.floor(Math.random()*(GRID_LENGTH*GRID_LENGTH));
	if(countMoves<GRID_LENGTH*GRID_LENGTH) {
	while(grid[Math.floor(rand/GRID_LENGTH)][rand%GRID_LENGTH]!=0)
		rand = Math.floor(Math.random()*(GRID_LENGTH*GRID_LENGTH));
	grid[Math.floor(rand/GRID_LENGTH)][rand%GRID_LENGTH]=2;
	countMoves++;
    renderMainGrid();
    addClickHandlers();
    swapTurn();
    setTimeout(function(){checkResult();},20);
		setTimerForHuman();
}
}

function declareCompAsWinner() {
	alert("You Lost: "+"Hiver Computer won this");
	location.reload();
}

setTimerForHuman();
initializeGrid();
renderMainGrid();
addClickHandlers();
