'use strict';

// Enter your js code Here

var LINE_AVAILABLE = 1;
var LINE_UNAVAILABLE = 2;
var LINE_SELECTED = 3;
var PLAYER1 = "PLAYER 1";
var PLAYER2 = "PLAYER 2";

var i;
var lines = new Array;    // global arry of line status
var viewLines = document.querySelectorAll('.line');

for (i=0; i<viewLines.length; i++)
  lines.push(LINE_AVAILABLE);

var board = document.getElementById("board");  // only 1 board, use ID
var currentTurn = document.getElementById("currentTurn");
currentTurn.innerHTML = PLAYER1;

var moveButton =  document.getElementById("moveButton");

moveButton.addEventListener('click', function(e)
{
    // Check if legal move, then check if game over

    var validMoveSoFar = false;
    var validMoveFound = false;
    var foundAnError = false;

    var j = 0;
    // execute max 3 times in this version

    while ((j<3) && (foundAnError == false))
    {
      var i = 0;
      // check first rows
      while ((i<10) && (foundAnError == false))
      {
          console.log("i=" + i + " j=" + j + "foundAnError=" + foundAnError);
          switch (lines[(j*10)+i]) {
            case LINE_SELECTED:

                if (validMoveFound == true)   // if line ever selected after a valid move found, return error immediately
                {
                  foundAnError = true;
                  break;
                }

                if (validMoveSoFar == true)  // still good move
                {
                  i++;
                }
                else
                {
                    validMoveSoFar = true;
                    i++;
                }

              break;

            case LINE_AVAILABLE:

              if (validMoveSoFar == true)  // this is the end of a valid move
              {
                  validMoveFound = true;  // bank the good move
                  validMoveSoFar = false; // reset
              }

              i++;

              break;

            default:  // LINE_UNAVAILABLE

              if (validMoveSoFar == true)  // this is the end of a valid move
              {
                  validMoveFound = true;  // bank the good move
                  validMoveSoFar = false; // reset
              }

              i++;

          }  // end switch

      } // end row while


        if (validMoveSoFar == true)  // still good move
        {
          validMoveFound = true;
          validMoveSoFar = false; // reset
        }

      j++;

    } //  end outer while

    if (validMoveSoFar == true)  // still good move
    {
      validMoveFound = true;
      validMoveSoFar = false; // reset
    }

    if ((foundAnError == false) && (validMoveFound == true))
    {
        var z;

        // update board
        for (z=0; z<30;z++)
        {
          if (lines[z] == LINE_SELECTED)
          {
            lines[z] = LINE_UNAVAILABLE;
            viewLines[z].style.background = "black";
          }
        }

        var gameContinues = false;

        //  check for winner - If any lines are available, continue
        for (z=0; z<30;z++)
        {
          if (lines[z] == LINE_AVAILABLE)
          {
            gameContinues = true;
          }
        }

        if (gameContinues == false)  // Announce winner if game over
        {
          if (currentTurn.innerHTML == PLAYER1)
            alert(PLAYER2 + " Wins!");
          else {
            alert(PLAYER1 + " Wins!");
          }
        }
        else    // Game continues, flip the turn
        {
          if (currentTurn.innerHTML == PLAYER1)
          {
            currentTurn.innerHTML = PLAYER2;
          }
          else {
            currentTurn.innerHTML = PLAYER1;
          }
        } // end else game continues

    }   // if no error and valid move existed

});



board.addEventListener('click', function(e)
{

    switch (lines[e.target.id]) {
      case LINE_AVAILABLE:

          viewLines[e.target.id].style.background = "red";
          lines[e.target.id] = LINE_SELECTED;
        break;

      case LINE_UNAVAILABLE:
        break;

      default:  // LINE_SELECTED
          viewLines[e.target.id].style.background = "white";
          lines[e.target.id] = LINE_AVAILABLE;

    }

});  // end of the board eventlistener
