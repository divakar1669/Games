
this.grid =  generateSudoku(); 
this.gridCopy = this.grid ;
this.solve = this.grid.map((row) => row.slice());
this.selectedValue = null;
this.difficultyLevel = 'Easy';


function difficultyLevelSelection(difficulty)
{
    this.grid = this.gridCopy;
    var removedCount =40;
  if (difficulty === 'Easy') {
    removedCount = 40;
  } else if (difficulty === 'Medium') {
    removedCount = 50;
  } else if (difficulty === 'Hard') {
    removedCount = 60;
  }
  else if (difficulty === 'Monster') {
    removedCount = 65;
  }


  for (var i = 0; i < removedCount; i++) {
    var row = Math.floor(Math.random() * 9);
    var col = Math.floor(Math.random() * 9);
    this.grid[row][col] = ''; 
    var id = "row"+(row)+"_col"+(col+1);
    var element =document.getElementById(id);
    element.classList.add("frozen-cell");
    element.contentEditable = false;
  }

  for (var i = 0; i <9; i++) {
    for (var j = 0; j < 9; j++) {
        var id = "row"+(i)+"_col"+(j+1);
        var element =document.getElementById(id);
        element.textContent = this.grid[i][j];
    }
}

}

function solvedSudoku()
{
    console.log(this.solve);

    for (var i = 0; i <9; i++) {
        for (var j = 0; j < 9; j++) {
            var element = "row"+(i)+"_col"+(j+1);
            var array = this.solve[i];
            document.getElementById(element).textContent = array[j];
            this.grid[i][j]=array[j];
        }
    }
}


function checkRow(row, value) {
    for (let i = 0; i < 9; i++) {
        if (this.grid[row][i] == value)
            return false;
    }
    return true;
}


function checkColumn(col, value) {
    col = col-1;
    for (let i = 0; i < 9; i++) {
        if (this.grid[i][col] == value)
            return false;
    }
    return true;
}

function checkBox(row, col, value) {
    var boxRow = Math.floor(row / 3) * 3;
    var boxCol = Math.floor(col / 3) * 3;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === value) {
          return false;
        }
      }
    }
    return true;
}

function checkStepCorrect(row, col, value) {
    return checkRow(row, value) && checkColumn(col, value) && checkBox(row, col, value);
}


function SetSelectedValue(id) {
    var selected = id.at(-1);
    this.selectedValue = Number(selected);
}

function SetRowColumn(CellNumber) {
    document.getElementById(CellNumber).innerText = selectedValue;
    var id = CellNumber;
    var row = id.at(3)
    var col = id.at(8);
   
    var x = checkStepCorrect(row, col, selectedValue) ;
    var color = (x) ? "green" : "red";
    this,grid[row][col] = selectedValue;
    console.log(color);
    document.getElementById(CellNumber).style.color = color;
}



function generateSudoku() {
    const board = new Array(9).fill(null).map(() => new Array(9).fill(0)); // Create an empty 9x9 Sudoku grid
    fillDiagonal(board); // Fill diagonal subgrids with random numbers
    solveSudoku(board); // Solve the Sudoku puzzle
    return board;
  }
  
  function fillDiagonal(board) {
    for (let boxStartRow = 0; boxStartRow < 9; boxStartRow += 3) {
      fillBox(board, boxStartRow, boxStartRow);
    }
  }
  
  function fillBox(board, startRow, startCol) {
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        board[i][j] = numbers[index];
        index++;
      }
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function solveSudoku(board) {
    const find = findEmptyCell(board);
    if (!find) {
      return true;
    }
  
    const [row, col] = find;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidNumber(board, row, col, num)) {
        board[row][col] = num;
  
        if (solveSudoku(board)) {
          return true;
        }
  
        board[row][col] = 0;
      }
    }
  
    return false;
  }
  
  function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }
  
  function isValidNumber(board, row, col, num) {
    return (
      isValidInRow(board, row, num) &&
      isValidInColumn(board, col, num) &&
      isValidInBox(board, row - (row % 3), col - (col % 3), num)
    );
  }
  
  function isValidInRow(board, row, num) {
    return !board[row].includes(num);
  }
  
  function isValidInColumn(board, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  function isValidInBox(board, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }
  
  function displayGrid(board) {
    for (let i = 0; i < 9; i++) {
      let rowString = "";
      for (let j = 0; j < 9; j++) {
        rowString += board[i][j] + " ";
      }
      console.log(rowString);
    }
  }