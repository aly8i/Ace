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
  const [bottomMargin,setBottomMargin] = useState('-40px')
  const [bottomPadding,setBottomPadding] = useState('0px')
  const [playedCards,setPlayedCards] = useState([])

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

    setPlayedCards(temp)
    const playedCardsNum = temp.filter(item => item).length;
    if (playedCardsNum > 3 ) {
      if(id == table?.users[0]){
        var points = 0;
        var highest = 0;
        var highestIndex = 0;
        var shuffle = false;
        playedCards.forEach((card,i) => {
          if (card) {
            if(card?.points==13)
              shuffle=true;
            points += card?.points
            if(card?.name>highest){
              highest = card?.name;
              highestIndex = i;
            }
          }
        });
        await addPoints(highestIndex,points,table?.id,shuffle)
      }
      setPlayedCards([]);
    }    
  }
  fn();
}, [table]);
console.log("playerID" +id)
console.log("first User" + table?.users[0]?.id)
console.log("played cards num:" + playedCards.length)
console.log("playerIndex:"+returnIndex())
console.log("table turn:"+table?.turn)
console.log("card type:"+table?.type)
  useEffect(()=>{
    switch (sortedCards?.length) {
      case 13:
        setBottomMargin('-40px')
        break;
      case 12:
        setBottomMargin('-37.5px')
        break;
      case 11:
        setBottomMargin('-34.5px')
        break;
      case 10:
        setBottomMargin('-30.9px')
        break;
      case 9:
        setBottomMargin('-26.4px')
        break;
      case 8:
        setBottomMargin('-20.6px')
        break;
      case 7:
        setBottomMargin('-13px')
        break;
      case 6:
        setBottomMargin('-2.1px')
        break;
      case 5:
        setBottomMargin('14px')
        break;
      case 4:
        setBottomMargin('41px')
        break;
      case 3:
        setBottomMargin('95px')
        break;
      case 2:
        setBottomMargin('35px')
        setBottomPadding('75px');
        break;
      case 1:
        setBottomMargin('400px')
        setBottomPadding('161px');
      default:
        setBottomMargin('-500px')
        break;
    }
  },[sortedCards?.length])

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
          {table?.usersData[returnIndex('top')]?.deck?.map((card, i) => (
            <div key={i} className={styles.card} style={{marginLeft: '-40px'}}>
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
          {table?.usersData[returnIndex('right')]?.deck?.map((card, i) => (
            <div key={i} className={styles.card}>
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
          {table?.usersData[returnIndex('left')]?.deck?.map((card, i) => (
            <div key={i} className={styles.card} >
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
            <div className={styles.card} key={i} onClick={()=>playCard(i)} style={{marginLeft: bottomMargin, paddingLeft: bottomPadding}}>
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