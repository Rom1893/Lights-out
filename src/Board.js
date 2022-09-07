import React, { Component } from "react";
import Cell from "./Cell";
import './css/Board.css';
import { chanceLightStartsOn } from "./helpers"


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    ncols: 5,
    nrow: 5
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board =
      Array.from({ length: this.props.nrows }).map(() => (
        Array.from({ length: this.props.ncols }).map(() => (
          chanceLightStartsOn()))
      ));

    // TODO: create array-of-arrays of true/false values
    return board

  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x - 1);

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    let sum = board.map((x) => x.reduce((cella, cellb) => cella + cellb))
    let game = sum.reduce((cella, cellb) => cella + cellb)
    let hasWon = (game === 0 ? true : false)



    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {
    let grid =
      <table className="Board">
        <tbody>
          {Array.from({ length: this.props.nrows }).map((z, y) => (
            <tr key={y}>
              {Array.from({ length: this.props.ncols }).map((z, x) => (
                <Cell coords={`${y}-${x}`} key={`${y}-${x}`} flipCellsAroundMe={this.flipCellsAround} isLit={this.state.board[y][x]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    return (
      <div >

        {!this.state.hasWon ?
          <div>
            <div className="board-title">
              <div className="neon">Lights</div>
              <div className="flux">Out</div>
            </div>
            {grid}
          </div>
          :
          <div className="board-title">
            <div className="neon">You</div>
            <div className="flux">Win</div>
          </div>}
      </div>

    )

    //  <div className="board-title">
    //           <div className="neon">You</div>
    //           <div className="flux">Win</div>
    //         </div>





    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;


//array of arrays 
// Tabla = [[a, b, c, d, e], [a, b, c, d, e], [a, b, c, d, e].... ]