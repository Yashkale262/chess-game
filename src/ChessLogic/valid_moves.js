
import {check} from './check.js' ;

const valid_pos=(i,j)=>{
    if(i>=0&&i<=7&&j>=0&&j<=7)return 1;
    return 0;
}

export const valid_moves = (boardStat,player,changeValidMoves) => {
    // let boardStat=boardStatus;
    //console.log("valid moves called");
    //console.log(boardStat);
    //console.log(player);
    if(player!==0&&player!==1)return;
    if(boardStat===undefined||boardStat.length===0)return;
    //console.log("valid moves running");
    let board=boardStat.board;
   

    let validMoves={
        nomove:1,
        moves:[],
    };
    
    for(let i=0;i<8;i++)
    {
        let row=[];
        for(let j=0;j<8;j++)
        {
            let cell=[];
            if(board[i][j].piece==="pawn"&&board[i][j].playerr===player)
            {
                cell=pawn_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            if(board[i][j].piece==="rook"&&board[i][j].playerr===player)
            {
                cell=rook_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            if(board[i][j].piece==="bishop"&&board[i][j].playerr===player)
            {
                cell=bishop_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            if(board[i][j].piece==="knight"&&board[i][j].playerr===player)
            {
                cell=knight_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            if(board[i][j].piece==="queen"&&board[i][j].playerr===player)
            {
                cell=queen_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            if(board[i][j].piece==="king"&&board[i][j].playerr===player)
            {
                cell=king_moves(boardStat,player,i,j);
                if(cell.length)validMoves.nomove=0;
            }
            
            row.push(cell);
        }
        validMoves.moves.push(row);
    }
  changeValidMoves(validMoves);
}

//Possible moves of a pawn
const pawn_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let di=[[1,2,1,1],[-1,-2,-1,-1]];
    let dj=[0,0,1,-1];
    let moves=[];
    for(let dir=0;dir<4;dir++)
    {
        let ni=rank+di[player][dir];
        let nj=file+dj[dir];
        if(valid_pos(ni,nj)&&board[ni][nj].playerr!==player)
        {
            if(dir===1&&(!((player===0&&rank===1&&board[ni][nj].piece==="empty"&&board[ni-1][nj].piece==="empty")||(player===1&&rank===6&&board[ni][nj].piece==="empty"&&board[ni+1][nj].piece==="empty"))))continue;
            if(dir>=2&&board[ni][nj].playerr!==1-player)continue;
            if(dir===0&&board[ni][nj].piece!=="empty")continue;
            let temp=board;
            let piece_ni=temp[ni][nj].piece;
            let playerr_ni=temp[ni][nj].playerr;
            temp[ni][nj].piece="pawn";
            temp[rank][file].piece="empty";
            temp[ni][nj].playerr=player;
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[ni][nj].piece=piece_ni;
            temp[ni][nj].playerr=playerr_ni;
            temp[rank][file].piece="pawn";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:ni,
                toFile:nj,
                piece:"pawn",
                moveswo:0,
                castle0:boardStat.castle0[player],
                castle7:boardStat.castle7[player],
            }   
            moves.push(move);
        }
    }
    return moves;
}

//Possible moves of a rook
const rook_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let di=[1,0,-1,0];
    let dj=[0,-1,0,1];
    let moves=[];
    for(let dir=0;dir<4;dir++)
    {
        let i=rank;
        let j=file;
        while(valid_pos(i+di[dir],j+dj[dir]))
        {
            i=i+di[dir];
            j=j+dj[dir];
            if(board[i][j].playerr===player)break;
            let temp=board;
            let piece_i=temp[i][j].piece;
            let playerr_i=temp[i][j].playerr;
            temp[i][j].piece="rook";
            temp[i][j].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[i][j].piece=piece_i;
            temp[i][j].playerr=playerr_i;
            temp[rank][file].piece="rook";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:i,
                toFile:j,
                piece:"rook",
                moveswo:boardStat.moveswo+1,
                castle0:boardStat.castle0[player],
                castle7:boardStat.castle7[player],
            }
            if(file===0)move.castle0=0;
            if(file===7)move.castle7=0;
            if(board[i][j].playerr===1-player)move.moveswo=0;
            moves.push(move);
            if(board[i][j].playerr===1-player)break;
        }
    }
    return moves;
}

//Possible moves of a bishop
const bishop_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let di=[1,1,-1,-1];
    let dj=[1,-1,1,-1];
    let moves=[];
    for(let dir=0;dir<4;dir++)
    {
        let i=rank;
        let j=file;
        while(valid_pos(i+di[dir],j+dj[dir]))
        {
            i=i+di[dir];
            j=j+dj[dir];
            if(board[i][j].playerr===player)break;
            let temp=board;
            let piece_i=temp[i][j].piece;
            let playerr_i=temp[i][j].playerr;
            temp[i][j].piece="bishop";
            temp[i][j].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[i][j].piece=piece_i;
            temp[i][j].playerr=playerr_i;
            temp[rank][file].piece="bishop";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:i,
                toFile:j,
                piece:"bishop",
                moveswo:boardStat.moveswo+1,
                castle0:boardStat.castle0[player],
                castle7:boardStat.castle7[player],
            }
            if(board[i][j].playerr===1-player)move.moveswo=0;
            moves.push(move);
            if(board[i][j].playerr===1-player)break;
        }
    }
    return moves;
}

 //Possible moves of a knight
const knight_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let moves=[];
    let dj=[1,2,2,1,-1,-2,-2,-1];
    let di=[2,1,-1,-2,-2,-1,1,2];
    for(let dir=0;dir<8;dir++)
    {
        let ni=rank+di[dir];
        let nj=file+dj[dir];
        if(valid_pos(ni,nj)&&board[ni][nj].playerr!==player)
        {
            let temp=board;
            let piece_ni=temp[ni][nj].piece;
            let playerr_ni=temp[ni][nj].playerr;
            temp[ni][nj].piece="knight";
            temp[ni][nj].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[ni][nj].piece=piece_ni;
            temp[ni][nj].playerr=playerr_ni;
            temp[rank][file].piece="knight";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:ni,
                toFile:nj,
                piece:"knight",
                moveswo:boardStat.moveswo+1,
                castle0:boardStat.castle0[player],
                castle7:boardStat.castle7[player],
            }   
            if(board[ni][nj].playerr===1-player)move.moveswo=0;
            moves.push(move);
        }
    }
    return moves;
}

//Possible moves of a queen
const queen_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let di=[1,1,1,-1,-1,-1,0,0];
    let dj=[1,-1,0,1,-1,0,1,-1];
    let moves=[];
    for(let dir=0;dir<8;dir++)
    {
        let i=rank;
        let j=file;
        while(valid_pos(i+di[dir],j+dj[dir]))
        {
            i=i+di[dir];
            j=j+dj[dir];
            if(board[i][j].playerr===player)break;
            let temp=board;
            let piece_i=temp[i][j].piece;
            let playerr_i=temp[i][j].playerr;
            temp[i][j].piece="queen";
            temp[i][j].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[i][j].piece=piece_i;
            temp[i][j].playerr=playerr_i;
            temp[rank][file].piece="queen";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:i,
                toFile:j,
                piece:"queen",
                moveswo:boardStat.moveswo+1,
                castle0:boardStat.castle0[player],
                castle7:boardStat.castle7[player],
            }
            if(board[i][j].playerr===1-player)move.moveswo=0;
            moves.push(move);
            if(board[i][j].playerr===1-player)break;
        }
    }
    return moves;
}

//Possible moves of a king
const king_moves=(boardStat,player,rank,file)=>{
    let board=boardStat.board;
    let moves=[];
    let di=[1,1,0,-1,-1,-1,0,1];
    let dj=[0,-1,-1,-1,0,1,1,1];
    for(let dir=0;dir<8;dir++)
    {
        let ni=rank+di[dir];
        let nj=file+dj[dir];
        if(valid_pos(ni,nj)&&board[ni][nj].playerr!==player)
        {
            let temp=board;
            let piece_ni=temp[ni][nj].piece;
            let playerr_ni=temp[ni][nj].playerr;
            temp[ni][nj].piece="king";
            temp[ni][nj].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[ni][nj].piece=piece_ni;
            temp[ni][nj].playerr=playerr_ni;
            temp[rank][file].piece="king";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            let move={
                fromRank:rank,
                fromFile:file,
                toRank:ni,
                toFile:nj,
                piece:"king",
                moveswo:boardStat.moveswo+1,
                castle0:0,
                castle7:0,
            }   
            if(board[ni][nj].playerr===1-player)move.moveswo=0;
            moves.push(move);
        }
    }

    if(boardStat.castle0[player]&&check(board,player)===0)
    {
        let ni=(player===0?0:7);
        let nj;
        for(nj=1;nj<=3;nj++)
        {
            if(board[ni][nj].piece!=="empty")break;
            if(nj===1)continue;
            let temp=board;
            let piece_ni=temp[ni][nj].piece;
            let playerr_ni=temp[ni][nj].playerr;
            temp[ni][nj].piece="king";
            temp[ni][nj].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[ni][nj].piece=piece_ni;
            temp[ni][nj].playerr=playerr_ni;
            temp[rank][file].piece="king";
            temp[rank][file].playerr=player;
            if(is_check)continue;
        }
        let move={
            fromRank:rank,
            fromFile:file,
            toRank:rank,
            toFile:2,
            piece:"king",
            moveswo:boardStat.moveswo+1,
            castle0:0,
            castle7:0,
        }
        if(nj===4)moves.push(move);  
    }

    if(boardStat.castle7[player]&&check(board,player)===0)
    {
        console.log("castle");
        let ni=(player===0?0:7);
        let nj;
        for(nj=5;nj<=6;nj++)
        {
            if(board[ni][nj].piece!=="empty")break;
            let temp=board;
            let piece_ni=temp[ni][nj].piece;
            let playerr_ni=temp[ni][nj].playerr;
            temp[ni][nj].piece="king";
            temp[ni][nj].playerr=player;
            temp[rank][file].piece="empty";
            temp[rank][file].playerr=-1;
            let is_check=check(temp,player);
            temp[ni][nj].piece=piece_ni;
            temp[ni][nj].playerr=playerr_ni;
            temp[rank][file].piece="king";
            temp[rank][file].playerr=player;
            if(is_check)continue;
            console.log("castle: ",nj);
        }
        let move={
            fromRank:rank,
            fromFile:file,
            toRank:rank,
            toFile:6,
            piece:"king",
            moveswo:boardStat.moveswo+1,
            castle0:0,
            castle7:0,
        }
        if(nj===7)moves.push(move);  
    }
    return moves;
}




