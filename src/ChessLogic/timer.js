import React from 'react'

const sleep=(ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms));
  }
let ntime=0;

export async function timer  ({startTime,start,changeTime}){
  
    if(start===1)ntime=startTime;
    if(start===0){
        ntime=startTime;
        return;
    }
    changeTime(ntime);
    while(ntime>0)
    {
        
        await sleep(1000);
        ntime=ntime-1;
        changeTime(ntime);
    }

    
    
}


