import React from 'react'
import './board.css';
import pawn1 from './chessPieces/pawn1.png'
import pawn0 from './chessPieces/pawn0.png'
import rook1 from './chessPieces/rook1.png'
import rook0 from './chessPieces/rook0.png'
import knight1 from './chessPieces/knight1.png'
import knight0 from './chessPieces/knight0.png'
import bishop1 from './chessPieces/bishop1.png'
import bishop0 from './chessPieces/bishop0.png'
import queen1 from './chessPieces/queen1.png'
import queen0 from './chessPieces/queen0.png'
import king1 from './chessPieces/king1.png'
import king0 from './chessPieces/king0.png'

export const Cell = (props) => {
    let imgsrc;
    let myStyle={
        backgroundColor: "#d18b47"
    }
    if((props.cell.rank+props.cell.file)%2===0)myStyle.backgroundColor="#ffce9e";
    if(props.cell.col===1||props.cell.col===2)
    {
        myStyle.backgroundColor="#16FF00";
        myStyle.border="2px solid black";
        myStyle.boxSizing="border-box";
    }
    if(props.cell.col===3)
    {
        myStyle.backgroundColor="yellow";
        myStyle.border="2px solid black";
        myStyle.boxSizing="border-box";
    }
    if(props.cell.check===1)
    {
        myStyle.backgroundColor="#F90716";
        myStyle.border="2px solid black";
        myStyle.boxSizing="border-box";
    }
    if(props.cell.piece==='empty')return(<div className='cell' style={myStyle} onClick={()=>{props.click(props.cell.rank,props.cell.file)}}></div>)
    if(props.cell.piece==='pawn'&&props.cell.playerr===1)imgsrc=pawn1;
    if(props.cell.piece==='pawn'&&props.cell.playerr===0)imgsrc=pawn0;
    if(props.cell.piece==='rook'&&props.cell.playerr===1)imgsrc=rook1;
    if(props.cell.piece==='rook'&&props.cell.playerr===0)imgsrc=rook0;
    if(props.cell.piece==='bishop'&&props.cell.playerr===1)imgsrc=bishop1;
    if(props.cell.piece==='bishop'&&props.cell.playerr===0)imgsrc=bishop0;
    if(props.cell.piece==='knight'&&props.cell.playerr===1)imgsrc=knight1;
    if(props.cell.piece==='knight'&&props.cell.playerr===0)imgsrc=knight0;
    if(props.cell.piece==='king'&&props.cell.playerr===1)imgsrc=king1;
    if(props.cell.piece==='king'&&props.cell.playerr===0)imgsrc=king0;
    if(props.cell.piece==='queen'&&props.cell.playerr===1)imgsrc=queen1;
    if(props.cell.piece==='queen'&&props.cell.playerr===0)imgsrc=queen0;

    return (
    <div className='cell' style={myStyle} onClick={()=>{props.click(props.cell.rank,props.cell.file)}}>
        {<img src={imgsrc} alt={props.cell.piece}/>}
    </div>
  )
}


