import React, { useState,useEffect } from 'react'
import Card from './Card'
const RandomCard = () => {
    const [nameNum,setNameNum] = useState(0);
    const [typeNum,setTypeNum] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const RandomName = Math.floor(Math.random() * 13) + 2;
            const RandomType = Math.floor(Math.random() * 4) + 1;
            setNameNum(RandomName);
            setTypeNum(RandomType);
        }, 1000);
        return () => clearInterval(interval);
      }, []); 
  return (
    <Card name={nameNum} type={typeNum}/>
  )
}

export default RandomCard

