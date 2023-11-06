import React from 'react'
import { UserContext } from '../../context/UserContext'
import { useEffect,useContext, useState } from 'react'
import styles from "../../Screens/Game/Game.module.scss"
import Image from 'next/image';
import Card from '../../components/Cards/sCard';
import BackCard from '../../components/Cards/backCard';
import PlayCard from '../../functions/PlayCard';
import addPoints from '../../functions/addPoints';

const Game = () => {
  const { table,id } = useContext(UserContext);
  const [sortedCards,setSortedCards] = useState([])
  const [playedCards,setPlayedCards] = useState([])
  const bm = ['400px','35px','161px','95px','41px','14px','-2.1px','-13px','-20.6px','-26.4px','-30.9px','-34.5px','-37.5px','-40px']
  const bp = ['0px','161px','75px','0px','0px','0px','0px','0px','0px','0px','0px','0px','0px','0px']
  const lm = ['-55px','100px','53px','25px','6px','-7px','-15px','-22px','-28px','-35px','-40px','-45px','-50px','-55px']
  const lp = ['14px','14px','-10px','0px','0px','0px','-20x','-15px','1px','4px','6px','8px','10px','14px']
  

  const returnIndex = (position='current') =>{
    var index = table?.users?.indexOf(id)
    if(position=='right'){
      index += 1
    }else if(position=='top'){
      index += 2
    }else if(position=='left'){
      index += 3
    }
    if(index>3){
      index -=4
    }
    return index
  }

  const playCard = async(i) => {
    if(table?.turn!==returnIndex())
      return
    if(table?.type!=0){
      const typeNum = sortedCards.filter(item => item.type==table?.type).length;
      if(sortedCards[i].type!=table?.type&&typeNum>0)
        return
    }
    const playedNum = playedCards.filter(item=>item).length
    await PlayCard(sortedCards[i],returnIndex(),id,table?.id,playedNum)
  }

  console.log("playerID" +id)
  console.log("first User" + table?.users[0]?.id)
  console.log("played cards num:" + playedCards.length)
  console.log("playerIndex:"+returnIndex())
  console.log("table turn:"+table?.turn)
  console.log("card type:"+table?.type)

  useEffect(()=>{
    const sorted = table?.usersData[table?.users?.indexOf(id)]?.deck
    .filter((x)=>x?.played!==true)
    .sort((a, b) => {
      if (a.type === b.type) {
        return a.name - b.name;
      }
      return a.type - b.type;
    });
    setSortedCards(sorted)
  },[table?.usersData[table?.users?.indexOf(id)]?.deck])
  



  useEffect(() => {
    const fn = async() => {
    const rightIndex = returnIndex('right');
    const leftIndex = returnIndex('left');
    const topIndex = returnIndex('top');
    const bottomIndex = returnIndex('bottom');

    const temp = [...playedCards];

    const playedRight = table?.usersData[rightIndex]?.deck.find(obj => obj.played === true);
    if(playedRight)
      temp[rightIndex] = playedRight;

    const playedLeft = table?.usersData[leftIndex]?.deck.find(obj => obj.played === true);
    if(playedLeft)
      temp[leftIndex] = playedLeft;

    const playedTop = table?.usersData[topIndex]?.deck.find(obj => obj.played === true);
    if(playedTop)
      temp[topIndex] = playedTop;

    const playedBottom = table?.usersData[bottomIndex]?.deck.find(obj => obj.played === true);
    if(playedBottom)
      temp[bottomIndex] = playedBottom;

    const playedCardsNum = temp.filter(item => item).length;
    if (playedCardsNum > 3 ) {
      if(id == table?.users[0]){
        var points = 0;
        var highest = 0;
        var highestIndex = 0;
        var shuffle = false;
        temp.forEach((card,i) => {
          if (card) {
            if(card?.points==13)
              shuffle=true;
            points += card?.points
            if(card?.name>highest&&card?.type==table?.type){
              highest = card?.name;
              highestIndex = i;
            }
          }
        });
        await addPoints(highestIndex,points,table?.id,shuffle)
      }
      setPlayedCards([]);
    }else{
      setPlayedCards(temp)
    }
  }
  fn();
}, [table]);
 
console.log(table?.usersData[returnIndex('top')]?.deck?.filter((card)=>card?.played!=true).length)

  return (
    <div className={styles.wrapper}>
      <div className={styles.topplayer}>
        <div className={styles.imgContainer}>
          <Image src={table?.usersData[returnIndex("top")]?.image} width={60} height={60} className={styles.img} />
        </div>
        <div className={styles.currentScore}>
          <p>{table?.usersData[returnIndex('top')]?.points}</p>
        </div>
        <div className={styles.totalScore}>
          <p>{table?.usersData[returnIndex('top')]?.score}</p>
        </div>
        <div className={styles.cardsContainer}>
          {table?.usersData[returnIndex('top')]?.deck?.filter((card)=>card?.played!=true).map((card, i, cards) => (
            <div key={i} className={styles.card} style={{marginLeft: bm[cards.length], paddingLeft: bp[cards?.length] }}>
              <BackCard/>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightplayer}>
        <div className={styles.imgContainer}>
          <Image src={table?.usersData[returnIndex("right")]?.image} width={60} height={60} className={styles.img} />
        </div>
        <div className={styles.currentScore}>
          <p>{table?.usersData[returnIndex('right')]?.points}</p>
        </div>
        <div className={styles.totalScore}>
          <p>{table?.usersData[returnIndex('right')]?.score}</p>
        </div>
        <div className={styles.cardsContainer}>
          {table?.usersData[returnIndex('right')]?.deck?.filter((card)=>card?.played!=true).map((card, i,cards) => (
            <div key={i} className={styles.card} style={{marginTop:lm[cards?.length],paddingTop:lp[cards?.length]}}>
              <BackCard flip={true} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.leftplayer}>
        <div className={styles.imgContainer}>
          <Image src={table?.usersData[returnIndex("left")]?.image} width={60} height={60} className={styles.img} />
        </div>
        <div className={styles.currentScore}>
          <p>{table?.usersData[returnIndex('left')]?.points}</p>
        </div>
        <div className={styles.totalScore}>
          <p>{table?.usersData[returnIndex('left')]?.score}</p>
        </div>
        <div className={styles.cardsContainer}>
          {table?.usersData[returnIndex('left')]?.deck?.filter((card)=>card?.played!=true).map((card, i, cards) => (
            <div key={i} className={styles.card} style={{marginTop: lm[cards?.length], paddingTop: lp[cards?.length]}}>
              <BackCard flip={true} />
            </div>
          ))}
        </div>
        </div>
      <div className={styles.bottomplayer}>
        <div className={styles.imgContainer}>
          <Image src={table?.usersData[returnIndex("bottom")]?.image} width={60} height={60} className={styles.img} />
        </div>
        <div className={styles.currentScore}>
          <p>{table?.usersData[returnIndex('bottom')]?.points}</p>
        </div>
        <div className={styles.totalScore}>
          <p>{table?.usersData[returnIndex('bottom')]?.score}</p>
        </div>
        <div className={styles.cardsContainer}>
          {sortedCards?.map((card,i)=>(
            <div className={styles.card} key={i} onClick={()=>playCard(i)} style={{marginLeft: bm[sortedCards?.length], paddingLeft: bp[sortedCards?.length] }}>
              <Card name={card.name} type={card.type} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.bottom}>
        {
          playedCards[returnIndex('bottom')]&&
          <Card name={playedCards[returnIndex('bottom')]?.name} type={playedCards[returnIndex('bottom')]?.type} />
        }
        </div>
        <div className={styles.top}>
        {
          playedCards[returnIndex('top')]&&
          <Card name={playedCards[returnIndex('top')]?.name} type={playedCards[returnIndex('top')]?.type} />
        }
        </div>
        <div className={styles.left}>
        {
          playedCards[returnIndex('left')]&&
          <Card name={playedCards[returnIndex('left')]?.name} type={playedCards[returnIndex('left')]?.type} />
        } 
        </div>
        <div className={styles.right}>
        {
          playedCards[returnIndex('right')]&&
          <Card name={playedCards[returnIndex('right')]?.name} type={playedCards[returnIndex('right')]?.type} />
        }
          </div>
      </div>
    </div>
  )
}

export default Game