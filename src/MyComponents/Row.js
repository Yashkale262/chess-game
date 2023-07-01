import React from 'react'
import {Cell} from "./Cell.js";
import './board.css';

export const Row = (props) => {
  
  if(props.player===0){
  return (
    <div className='row'>
        {
        props.row.map((cell)=>{
            return (<Cell  key={cell.file} cell={cell} click={props.click}/>)
        })
      }
    </div>
  )}
  if(props.player===1){
    return (
      <div className='row'>
          {
          props.row.toReversed().map((cell)=>{
              return (<Cell  key={cell.file} cell={cell} click={props.click}/>)
          })
        }
      </div>
    )}
}


