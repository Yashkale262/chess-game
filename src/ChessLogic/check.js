

export const check = (board,player) => {

    const valid_pos=(i,j)=>{
        if(i>=0&&i<=7&&j>=0&&j<=7)return 1;
        return 0;
    }

    if(board===undefined)return 0;
    
    //Finding the position of king
    let king_rank,king_file;
    for(let i=0;i<=7;i++)
    {
        for(let j=0;j<=7;j++)
        {
            if(board[i][j].piece==="king"&&board[i][j].playerr===player)
            {
                king_rank=i;
                king_file=j;
            }
        }
    }

    
    //Checking if the king can be attacked by a pawn
    let i=king_rank;
    let j=king_file;
    if(player===0&&valid_pos(i+1,j-1)&&board[i+1][j-1].piece==="pawn"&&board[i+1][j-1].playerr===1-player)return 1;
    if(player===0&&valid_pos(i+1,j+1)&&board[i+1][j+1].piece==="pawn"&&board[i+1][j+1].playerr===1-player)return 1;
    if(player===1&&valid_pos(i-1,j-1)&&board[i-1][j-1].piece==="pawn"&&board[i-1][j-1].playerr===1-player)return 1;
    if(player===1&&valid_pos(i-1,j+1)&&board[i-1][j+1].piece==="pawn"&&board[i-1][j+1].playerr===1-player)return 1;
    
    //Checking if the king can be attacked by a knight
    let dj=[1,2,2,1,-1,-2,-2,-1];
    let di=[2,1,-1,-2,-2,-1,1,2];
    for(let dir=0;dir<8;dir++)
    {
        let ni=king_rank+di[dir];
        let nj=king_file+dj[dir];
        if(valid_pos(ni,nj)&&board[ni][nj].piece==="knight"&&board[ni][nj].playerr===1-player)return 1;
    }

    //Checking if the king can be attacked by a king
    di=[1,1,0,-1,-1,-1,0,1];
    dj=[0,-1,-1,-1,0,1,1,1];
    for(let dir=0;dir<8;dir++)
    {
        let ni=king_rank+di[dir];
        let nj=king_file+dj[dir];
        if(valid_pos(ni,nj)&&board[ni][nj].piece==="king"&&board[ni][nj].playerr===1-player)return 1;
    }

    //Checking if the king can be attacked by a rook or a queen in straight line move
    di=[1,0,-1,0];
    dj=[0,-1,0,1];
    for(let dir=0;dir<4;dir++)
    {
        i=king_rank;
        j=king_file;
        while(valid_pos(i+di[dir],j+dj[dir]))
        {
            i=i+di[dir];
            j=j+dj[dir];
            if(board[i][j].playerr===player)break;
            if(board[i][j].playerr===1-player)
            {
                if(board[i][j].piece==="queen"||board[i][j].piece==="rook")
                {
                    return 1;
                }
                else{
                    break;
                }
            }
        }
    }
    //Checking if the king can be attacked by a bishop or a queen in diagonal line move
    di=[1,1,-1,-1];
    dj=[1,-1,1,-1];
    for(let dir=0;dir<4;dir++)
    {
        i=king_rank;
        j=king_file;
        while(valid_pos(i+di[dir],j+dj[dir]))
        {
            i=i+di[dir];
            j=j+dj[dir];
            if(board[i][j].playerr===player)break;
            if(board[i][j].playerr===1-player)
            {
                if(board[i][j].piece==="queen"||board[i][j].piece==="bishop")
                {
                    return 1;
                }
                else{
                    break;
                }
            }
        }
    }
    return (0);
}


