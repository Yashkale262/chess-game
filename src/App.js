
import './App.css';
import io from 'socket.io-client';
import {LandingPage} from './MyComponents/LandingPage.js';
import {Board} from './MyComponents/Board.js';
import React, {useState, useEffect} from 'react';
import {v4} from 'uuid';
import {check} from './ChessLogic/check.js' ;
import {valid_moves} from './ChessLogic/valid_moves.js' ;
import { timer } from './ChessLogic/timer';

const socket=io.connect("https://chess-game-backend.onrender.com/");

function App() {
  const [status, setStatus] = useState(0);
  const [disconnect, setDisconnect] = useState(0);
  const [boardStatus, setBoardStatus] = useState();
  const [player,setPlayer] = useState();
  const [chance,setChance] = useState();
  const [fromRank,setFromRank] = useState();
  const [fromFile,setFromFile] = useState();
  const [link,setLink] = useState("");
  const [time,setTime] = useState(60);
  const [validMoves,setValidMoves] = useState();
  const [promotionMove,setPromotionMove] = useState();
  
  const playOnline=()=>{
    setStatus(1);
    socket.emit('play-online');
  }

  const challengeFriend=()=>{
    let uuid_generated=v4();
    setLink(uuid_generated);
    setStatus(2);
    socket.emit('challenge-friend',uuid_generated);
  }

  const acceptChallenge=()=>{
    setStatus(3);
  }

  const joinGame=(code)=>{
    setStatus(4);
    socket.emit('join-game',code);
  }

  const changeValidMoves=(data)=>{
    setValidMoves(data);
  }

  const resetBoard=()=>{
    let startBoard=[];
    for(let i=0;i<8;i++)
    {
        let row=[];
        for(let j=0;j<8;j++)
        {
          let cell={
            piece:"empty",
            playerr:-1,       //0 for white player and 1 for black player
            rank:i,
            file:j,
            col:0,
            check:0,
          }
          if(i===0||i===1)cell.playerr=0;
          if(i===6||i===7)cell.playerr=1;
          if(i===1||i===6)cell.piece="pawn";
          if(i===0||i===7)
          {
            if(j===0||j===7)cell.piece="rook";
            if(j===1||j===6)cell.piece="knight";
            if(j===2||j===5)cell.piece="bishop";
            if(j===3)cell.piece="queen";
            if(j===4)cell.piece="king";
          }
          row.push(cell);
        }
        startBoard.push(row);
    }
    let startBoardStatus={
      moveswo: 0,
      castle0: [1,1],
      castle7: [1,1],
      board: startBoard,
    }
    setBoardStatus(startBoardStatus);
    setChance(0);
    valid_moves(startBoardStatus,player,changeValidMoves);
  }

  const makeMove=(move,playerMoved,boardStatus)=>{
    let temp=boardStatus;
    for(let i=0;i<8;i++){ 
      for(let j=0;j<8;j++){
        temp.board[i][j].col=0;
        temp.board[i][j].check=0;
      }}
    
    temp.board[move.fromRank][move.fromFile].piece="empty";
    temp.board[move.fromRank][move.fromFile].playerr=-1;
    temp.board[move.fromRank][move.fromFile].col=3;
    temp.board[move.toRank][move.toFile].piece=move.piece;
    temp.board[move.toRank][move.toFile].playerr=playerMoved;
    temp.board[move.toRank][move.toFile].col=3;
    if(move.piece==="king"&&move.fromFile===4&&move.toFile===2)
    {
      temp.board[move.fromRank][0].piece="empty";
      temp.board[move.fromRank][0].playerr=-1;
      temp.board[move.fromRank][4].piece="rook";
      temp.board[move.fromRank][4].playerr=playerMoved;
    }
    if(move.piece==="king"&&move.fromFile===4&&move.toFile===6)
    {
      temp.board[move.fromRank][7].piece="empty";
      temp.board[move.fromRank][7].playerr=-1;
      temp.board[move.fromRank][4].piece="rook";
      temp.board[move.fromRank][4].playerr=playerMoved;
    }

    temp.moveswo=move.moveswo;
    temp.castle0[player]=move.castle0;
    temp.castle7[player]=move.castle7;
    setBoardStatus(temp);
    let newchance=1-playerMoved;
    setChance(newchance);
    valid_moves(temp,player,changeValidMoves);
    socket.emit('send-move',
      {board: temp,
        movedBy:playerMoved,
    }
    );
  }
  
  const click=(x,y)=>{
    let temp=boardStatus;
    if(chance!==player)return;
    if(status!==-1)return;
    if(temp.board[x][y].col===0&&validMoves.moves[x][y].length)
    {
      for(let i=0;i<8;i++){ 
      for(let j=0;j<8;j++){
        temp.board[i][j].col=0;
      }}
      temp.board[x][y].col=1;
      validMoves.moves[x][y].map((move)=>{
        temp.board[move.toRank][move.toFile].col=2;
      })
      setFromRank(x);
      setFromFile(y);
      setBoardStatus(temp);
    }
    else if(temp.board[x][y].col===2)
    {
      
      validMoves.moves[fromRank][fromFile].map((move)=>{
        if(move.toRank===x&&move.toFile===y)
        {
            if(move.piece==="pawn"&&(move.toRank===7||move.toRank===0))
            {
              setPromotionMove(move);
              setStatus(-2);
              return;
            }
            makeMove(move,player,boardStatus);
        }
      })
    }
  }

  const promote=(promoteTo)=>{
    let tempMove=promotionMove;
    tempMove.piece=promoteTo;
    setStatus(-1);
    makeMove(tempMove,player,boardStatus);
  }

  const changeTime=(ntime)=>{
    setTime(ntime);
  }


  useEffect(()=>{
    socket.on("game-details-p0",(game)=>{
      setPlayer(0);
      socket.emit("game-details-p1-toserver",{room:game.room,player:1});
      setStatus(-1);
      let start=1;
      let startTime=60;
      timer({startTime,start,changeTime});
    })
    // eslint-disable-next-line
  },[socket]);

  useEffect(()=>{
    socket.on("game-details-p1",(game)=>{
      setPlayer(1);
      setStatus(-1);
      let start=1;
      let startTime=60;
      timer({startTime,start,changeTime});
    }) 
    // eslint-disable-next-line
  },[socket]);

  useEffect(()=>{
    socket.on("other-player-disconnected",(game)=>{
      setDisconnect(1);
    })
    // eslint-disable-next-line
  },[socket]);

  useEffect(()=>{
    socket.on("receive-move",(data)=>{
      if(check(data.board.board,1-data.movedBy)){
        for(let i=0;i<8;i++){
        for(let j=0;j<8;j++)
        {
          if(data.board.board[i][j].piece==="king"&&data.board.board[i][j].playerr===1-data.movedBy){
            data.board.board[i][j].check=1;
          }
        }
        }
      }
      setBoardStatus(data.board);
      setTime(60);
      setChance(1-data.movedBy);
      valid_moves(data.board,1-data.movedBy,changeValidMoves);
    })
    // eslint-disable-next-line
  },[socket]);


  useEffect(()=>{
    socket.on("receive-status",(data)=>{
      setStatus(data);
    })
    // eslint-disable-next-line
  },[socket]);

  useEffect(()=>{
    resetBoard();
    // eslint-disable-next-line
  },[player]);

useEffect(()=>{
  if(validMoves)
  {
      let start=0;
      let startTime=60;
      timer({startTime,start,changeTime});
  }
  if(player===chance&&validMoves&&validMoves.nomove&&check(boardStatus.board,player))
  {
    setStatus(-6);
    let sendStatus=-5;
    socket.emit("send-status",sendStatus);
  }
  if(player===chance&&validMoves&&validMoves.nomove&&check(boardStatus.board,player)===0)
  {
    setStatus(-7);
    let sendStatus=-7;
    socket.emit("send-status",sendStatus);
  }
  // eslint-disable-next-line
},[validMoves]);

useEffect(()=>{
  if(disconnect===1&&(status===-2||status===-1))setStatus(-4);
  // eslint-disable-next-line
},[disconnect]);

  useEffect(()=>{
    if(time===0&&player===chance&&(status===-1||status===-2))
    {
      setStatus(-8);
      let sendStatus=-8;
      socket.emit("send-status",sendStatus);
    }
  // eslint-disable-next-line
  },[time]);
  
  if(status<0)
  {
  return (
    <>
    <div className="App">
      <Board status={status} boardStatus={boardStatus} player={player} chance={chance} time={time} click={click} promote={promote}/>
    </div>
    </>
  );
  }

  if(status>=0)
  {
  return (
    <div className="App">
      <LandingPage  status={status} link={link} playOnline={playOnline} challengeFriend={challengeFriend} acceptChallenge={acceptChallenge} joinGame={joinGame}/>
    </div>
  );
  }
}

export default App;
/**/