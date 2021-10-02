
import './App.css';
import React,{useState,useEffect} from "react";
import Cell from "./Cell"
import {GiConwayLifeGlider} from "react-icons/gi"

const getRandomBoard = (row,col)=>{
  let randomArr = [];
  for (let r = 0; r < row; r++) {
    randomArr.push([]);
    for (let c = 0; c < col; c++) {
      if(Math.round(Math.random()))
      {
        randomArr[r].push(true);
        
      }
      else{
        randomArr[r].push(false);

      }
    }
  }
  return randomArr;
}

function App() {
  const setNewBoard = () => {
    const checkIfAlive = (row, col) => {
      let aliveCount = 0;
      const cellStatus = cells[row][col];
     
      try {
        const neighbors = [];
        //  const topRight = [row - 1, col + 1];
        //  const top = [row + 1, col];
        //  const topLeft = [row + 1, col - 1];
        //  const left = [row, col - 1];
        //  const right = [row, col + 1];
        //  const bottomRight = [row + 1, col + 1];
        //  const bottom = [row + 1, col];
        //  const bottomLeft = [row + 1, col - 1];
        //  const eightNeighbors = [
        //    topRight,
        //    top,
        //    topLeft,
        //    left,
        //    right,
        //    bottomRight,
        //    bottom,
        //    bottomLeft,
        //  ];

         for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1 , cells.length -1 ) ; r++){
           for (let c = Math.max(col -1 , 0) ; c <= Math.min( col + 1 , cells[0].length - 1) ; c++){
             if(r !== row || c !== col){
              neighbors.push([r,c]);}
           }
         }

        neighbors.map((neighbor) => {
          if (cells[neighbor[0]][neighbor[1]]) {
            aliveCount++;
          }
         
        });
      } catch (error) {
        console.log(error.message);
      }

      // cell alive conditions

      if (cellStatus && (aliveCount === 2  || aliveCount === 3)) {
        return true;
      } else if (!cellStatus && aliveCount === 3) {
        return true;
      } else return false;
    };
    const newBoard = cells.map((row,r) => {
      return row.map((cell,c) => {

        return checkIfAlive(r,c);

      });
    });
    setCells(newBoard);
  };
  const [row, setRow] = useState(25);
  const [col, setCol] = useState(25);
  const [cells, setCells] = useState(getRandomBoard(row,col));
  const [generation, setGeneration] = useState(0);
  const [clear, setClear] = useState(false);

  const clearBoard = ()=>{
   let emptyArr = [];
     for (let r = 0; r < row; r++) {
       emptyArr.push([]);
       for (let c = 0; c < col; c++) {
        emptyArr[r].push(0);
       }
     }
     setCells(emptyArr);
     setGeneration(0);
     setClear(true);
  }
  const pauseAndPlay = ()=>{
    setClear(!clear);
  }
  const randomize = ()=>{
    setGeneration(0);
    setCells(getRandomBoard(row, col));
    setClear(false);
  }
  const handleSubmit = (event)=>{
    event.preventDefault();
  // set root css values
    document.documentElement.style.setProperty('--row',row);
    document.documentElement.style.setProperty('--col', col);

    setCells(getRandomBoard(row,col))
    setGeneration(0);
    setClear(false);

  }
  
useEffect(() => {
  if(!clear){
  const timeOut = setTimeout(() => {
    setNewBoard();
    setGeneration(generation +1 );
  }, 125);
  return () => {
    clearTimeout(timeOut);
  };}
});
  return (
    <main>
      <header>
        <h1 className="main-header">
          Conway's Game of Life{" "}
          <span>
            <GiConwayLifeGlider />
          </span>{" "}
        </h1>
      </header>
      <section className="grid-container">
        {cells.map((row, r) => {
          return row.map((cellStatus, c) => {
            return <Cell key={`${(r, c)}`} cellStatus={cellStatus}></Cell>;
          });
        })}
      </section>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <p className="col">
            Generation <span>{generation}</span>
          </p>
        </div>
        <div className="row" onClick={() => pauseAndPlay()}>
          <p>Start/Pause/Resume</p>
        </div>
        <div className="row" onClick={() => randomize()}>
          <p>Randomize</p>
        </div>
        <div className="row" onClick={() => clearBoard()}>
          <p>Clear Board</p>
        </div>
        <div className="row">
          <label htmlFor="row"> Row </label>
          <input
            id="row"
            type="text"
            value={row}
            onChange={(event) => setRow(event.target.value)}
          />
          <label htmlFor="col"> Col </label>
          <input
            id="col"
            type="text"
            value={col}
            onChange={(event) => setCol(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;

