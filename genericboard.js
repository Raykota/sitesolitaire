

    class Box{

        constructor(isEmpty, isPlayable, row, col)
        {
            this.isEmpty = isEmpty;
            this.isPlayable = isPlayable;
            this.row = row;
            this.col = col; 

        }
    
            isEmpty()
            {
                return this.isEmpty;
            }
            isPlayable()
            {
                return this.isPlayable;
                }
            emptyIt()
            {
                this.isEmpty = true;
                $("#b"+String(this.row*rows+this.col)).removeClass("boxfull");
                $("#b"+String(this.row*rows+this.col)).addClass("boxempty");
                }
            fillIt()
            {
                this.isEmpty = false;
                $("#b"+String(this.row*rows+this.col)).addClass("boxfull");
                $("#b"+String(this.row*rows+this.col)).removeClass("boxempty");
                }
            selectedIt()
            {
                $("#b"+String(this.row*rows+this.col)).removeClass("boxfull");
                $("#b"+String(this.row*rows+this.col)).addClass("boxselected");

            }

            deselectedIt()
            {
                $("#b"+String(this.row*rows+this.col)).addClass("boxfull");
                $("#b"+String(this.row*rows+this.col)).removeClass("boxselected");
            }

        }


choosenBoxes = [];

var sec =0;
var min =0;
var rows = 7;
var cols = 7;
var board = [];
var idx;
var mask = [
    0,0,1,1,1,0,0,
    0,0,1,1,1,0,0,
    1,1,1,1,1,1,1,
    1,1,1,2,1,1,1,
    1,1,1,1,1,1,1,
    0,0,1,1,1,0,0,
    0,0,1,1,1,0,0
];

var points = 10000;
var  timer;
var showpoint;

$(document).ready(function () {
    

    
    var Layoutboardplayer = $("#layoutplayer");
    var layoutboard = Layoutboardplayer.append("<div>");
    layoutboard.attr("class","container");





    for(var i=0;i<rows;i++)
    {
        var idrow = "player-r"+ String(i)
        var row = Layoutboardplayer.append("<div class=\" justify-content-center row\" id=\"" + idrow +"\">");
        
        for(var j=0;j<cols;j++)
        {
            var boxclass = "<div class=\" col-md-auto box r"+String(i)+" c"+String(j);
           
            switch(mask[i*rows+j])
            {
                case 0:
                    $("#"+idrow).append(boxclass+" notpion \" id=\"b"+String(i*rows+j) +"\">");
                    board.push(new Box(true,false,i,j))
                  break;
                case 1:
                    $("#"+idrow).append(boxclass+" boxfull \"id=\"b"+String(i*rows+j) +"\">");
                    $("#b"+String(rows*i+j)).on("click",movepiece);
                    board.push(new Box(false,true,i,j));
    
                    break;
                case 2:
                    $("#"+idrow).append(boxclass+" boxempty \" id=\"b"+String(i*rows+j) +"\">");
                    $("#b"+String(rows*i+j)).on("click",movepiece);

                    board.push(new Box(true,true,i,j));

                    break;
                
            }
        }
    }
    $(".timer").html("[ 0 min 0 sec]");
timer = setInterval(horloge,1000);
showpoint = setInterval(showPoint,500);
});

function movepiece(event)
{

    var colrow = event.target.getAttribute("id");
    var row =  parseInt(colrow.slice(1,3)/rows);
    var col = colrow.slice(1,3)%rows;
    if(board[row*rows+col].isPlayable)
    {
        if(choosenBoxes.length == 0)
        {
            choosenBoxes.push(board[rows*row+col]);
            board[rows*row+col].selectedIt();
        }
        else{
            if(choosenBoxes.length == 1)
            {
                choosenBoxes.push(board[rows*row+col]);
                if(tryMove())
                {
                    points+=5;
                }
                else{
                    choosenBoxes[0].deselectedIt();
                    points -=20;
                }
                choosenBoxes = [];
                if (checkForWin())
                {
                  points += 1000;
                  clearInterval(showPoint);
                  clearInterval(timer);
                  $("#victoryordefeat").html("Victoire !! Bravo !!");
                  $("#windowresult").css("display","block");
                }else if (checkForLose())

                    {
                      points -=2000;
                      clearInterval(showPoint);
                      clearInterval(timer);
                      $("#victoryordefeat").html("Défaite !!!!!!");
                      $("#windowresult").css("display","block");
                    }
  
                
                

                
            }
    }

function tryMove()
{
    
        if(isMovable(choosenBoxes[0].row,choosenBoxes[0].col,choosenBoxes[1].row,choosenBoxes[1].col))
        {
            var idx = ((choosenBoxes[0].row + choosenBoxes[1].row) / 2)*rows +((choosenBoxes[0].col + choosenBoxes[1].col) / 2);
            choosenBoxes[0].emptyIt();
            choosenBoxes[0].deselectedIt();
            choosenBoxes[1].fillIt();
            board[idx].emptyIt();
            return true
    
        }
return false;

}

return false;

}



function possibliesMove(row,col)
{
    var moves = 0;
    if (row > 1 && isMovable(row, col, row - 2, col)) moves++;
    if (col > 1 && isMovable(row, col, row, col - 2)) moves++;
    if (row < rows - 2 && isMovable(row, col, row + 2, col)) moves++;
    if (col < cols - 2 && isMovable(row, col, row, col + 2)) moves++;
    return moves;
}


function checkForWin() {
    var remaining_pieces = 0;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            if (!board[row*rows+col].isEmpty) remaining_pieces++;
            if (remaining_pieces > 1) return false;
        }
    }
    return true;
}


function checkForLose() {
    var remaining_moves = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (!board[i*rows+j].isEmpty) {
                var b = possibliesMove(i,j);
                remaining_moves += b;
            }
        }
    }
    return remaining_moves == 0;
}


function isMovable(row1, col1, row2, col2) {
    if (row1 == row2 && Math.abs(col1 - col2) == 2 || col1 == col2 && Math.abs(row1 - row2) == 2) {
        var mid_row = (row1 + row2) / 2;
        var mid_col = (col1 + col2) / 2;
        return !board[mid_row*rows+mid_col].isEmpty && board[row2*rows+col2].isEmpty && board[row2*rows+col2].isPlayable;
    } else return false;
}

}

function horloge()
{
    sec += 1;
    points -= 15;
    if (sec ==60)
    {
        min +=1;
        sec=0;
    }

    $(".timer").html("[ "+min+" min "+sec+" sec]");
}


function showPoint()
{
    $(".points").html(points)
}

