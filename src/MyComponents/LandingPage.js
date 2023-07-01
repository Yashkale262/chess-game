import './LandingPage.css'
import './LandingPage.scss'
import React, {useState, useEffect} from 'react';

export const LandingPage = (props) => {
  const [inputCode, setInputCode] = useState('');
  if(props.status===0)
  {
  return (
    <div className='landingpage'>
      <div className='heading'>Chess Game</div>
      <div className='card'>
        <button className="button-73 bar" onClick={()=>{props.playOnline()}} >PLAY ONLINE</button>
        <button className="button-73 bar" onClick={()=>{props.challengeFriend()}} >CHALLENGE A FRIEND</button>
        <button className="button-73 bar" onClick={()=>{props.acceptChallenge()}} >ACCEPT CHALLENGE</button>
      </div>
    </div>
  )
  }

  
  if(props.status===1)
  {
  return (
    <div className='landingpage'>
      <div className='heading'>Chess Game</div>
      <div className='card'>
        <span className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className='wait'>Searching for a player to join...</div>
    
      </div>
    </div>
  )
  }

  if(props.status===2)
  {
  return (
    <div className='landingpage'>
    <div className='heading'>Chess Game</div>
      <div className='card'>
        <div className='wait'>Ask opponent player to accept challenge with this join code : <div className='joincode'>{props.link}</div></div>
        <span className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className='wait'>Waiting for player to join...</div>
      </div>
    </div>
  )
  }

  if(props.status===3||props.status===4)
  {
  return (
    <div className='landingpage'>
      <div className='heading'>Chess Game</div>
      <div className='card'>
        {(props.status===4)&&<div className='wait'>Incorrect Join code</div>}
        <div className='join'>
          <input placeholder='Join code' className='joincodeinput' onChange={(e)=>{setInputCode(e.target.value)}}></input>
           <button className=" button-73 joinbtn" onClick={()=>{props.joinGame(inputCode)}}>JOIN</button>
        </div>

        </div>
    </div>
  )
  }

}


