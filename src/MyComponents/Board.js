import React from 'react'
import {Row} from "./Row.js";
import './board.css';
import bg from './chessPieces/bg2.jpeg'

import rook1 from './chessPieces/rook1.png'
import rook0 from './chessPieces/rook0.png'
import knight1 from './chessPieces/knight1.png'
import knight0 from './chessPieces/knight0.png'
import bishop1 from './chessPieces/bishop1.png'
import bishop0 from './chessPieces/bishop0.png'
import queen1 from './chessPieces/queen1.png'
import queen0 from './chessPieces/queen0.png'

export const Board = (props) => {
  
  const myStyle={
    backgroundImage:`url(${bg})`,
  }
  if(props.player===0)
  {
    let imgsrc1=queen0;
    let imgsrc2=rook0;
    let imgsrc3=bishop0;
    let imgsrc4=knight0;
    return (
    <div className='boardPage' style={myStyle}>
    <div className='board'>
      {props.player===props.chance&&<div className='chanceDisplay'>
        <div>Your Chance</div>
        <div>Time Left: {props.time}</div>
      </div>}
      {props.player!==props.chance&&<div className='chanceDisplay'>
        <div>Opponent's Chance</div>
        {/* <div>Time Left: {props.time}</div> */}
      </div>}
      {
        props.boardStatus.board.toReversed().map((row)=>{
            return (<Row  key={row[0].rank} row={row} player={props.player} click={props.click}/>)
        })
      }
      
      {props.status===-2&&<div className='promote'>
      <div className='promotehead'>Promote pawn to:</div>
        <div>
        {<img className='imgpromote' src={imgsrc1} alt="Queen" onClick={()=>{props.promote("queen")}}/>}
        {<img className='imgpromote' src={imgsrc2} alt="Rook" onClick={()=>{props.promote("rook")}}/>}
        {<img className='imgpromote' src={imgsrc3} alt="Bishop" onClick={()=>{props.promote("bishop")}}/>}
        {<img className='imgpromote' src={imgsrc4} alt="Knight" onClick={()=>{props.promote("knight")}}/>}
        </div>
      </div>}

      {(props.status<=-4)&&<div className={`winLossBox ${(props.status>=-5)?"green":(props.status===-6)?"red":" "}`}>
        {(props.status===-4)&&<div className='winLoss'>Opponent player left.</div>}
        {(props.status===-5)&&<div className='winLoss'>Checkmate</div>}
        {(props.status===-6)&&<div className='winLoss'>Checkmate</div>}
        {(props.status===-7)&&<div className='winLoss'>Stalemate</div>}
        {(props.status===-8)&&<div className='winLoss'>Time Out</div>}

        {((props.status>=-5||(props.status===-8&&props.chance!==props.player)))&&<div className='winLoss'>Congratulation! You Won.</div>}
        {((props.status===-6)||(props.status===-8&&props.chance===props.player))&&<div className='winLoss'>Oops! You Lost.</div>}
        {(props.status===-7)&&<div className='winLoss'>Its a draw.</div>}
      </div>}
      
    </div>
        
    </div>
  )}


  else if(props.player===1)
  {
    
    let imgsrc1=queen1;
    let imgsrc2=rook1;
    let imgsrc3=bishop1;
    let imgsrc4=knight1;
    return (
    <div className='boardPage' style={myStyle}>
    <div className='board'>
     {props.player===props.chance&&<div className='chanceDisplay'>
        <div>Your Chance</div>
        <div>Time Left: {props.time}</div>
      </div>}
      {props.player!==props.chance&&<div className='chanceDisplay'>
        <div>Opponent's Chance</div>
        {/* <div>Time Left: {props.time}</div> */}
      </div>}

      {
        props.boardStatus.board.map((row)=>{
            return (<Row  key={row[0].rank} row={row} player={props.player} click={props.click}/>)
        })
      }
      {props.status===-2&&<div className='promote'>
      <div className='promotehead'>Promote pawn to:</div>
        <div>
        {<img className='imgpromote' src={imgsrc1} alt="Queen" onClick={()=>{props.promote("queen")}}/>}
        {<img className='imgpromote' src={imgsrc2} alt="Rook" onClick={()=>{props.promote("rook")}}/>}
        {<img className='imgpromote' src={imgsrc3} alt="Bishop" onClick={()=>{props.promote("bishop")}}/>}
        {<img className='imgpromote' src={imgsrc4} alt="Knight" onClick={()=>{props.promote("knight")}}/>}
        </div>
      </div>}
      {(props.status<=-4)&&<div className={`winLossBox ${(props.status>=-5)?"green":(props.status===-6)?"red":" "}`}>
        {(props.status===-4)&&<div className='winLoss'>Opponent player left.</div>}
        {(props.status===-5)&&<div className='winLoss'>Checkmate</div>}
        {(props.status===-6)&&<div className='winLoss'>Checkmate</div>}
        {(props.status===-7)&&<div className='winLoss'>Stalemate</div>}
        {(props.status===-8)&&<div className='winLoss'>Time Out</div>}

        {(props.status>=-5||(props.status===-8&&props.chance!==props.player))&&<div className='winLoss'>Congratulation! You Won.</div>}
        {(props.status===-6||(props.status===-8&&props.chance===props.player))&&<div className='winLoss'>Oops! You Lost.</div>}
        {(props.status===-7)&&<div className='winLoss'>Its a draw.</div>}
      </div>}
    </div>
  </div>
  )}
}


