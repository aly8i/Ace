import React from 'react'

const generateCards = async(tableID) => {
    var cards = [];

    //create cards
    for (let type = 1; type <= 4; type++) {
      for (let name = 2; name <= 14; name++) {
        var points = 0;
        if(type==3){
          // hearts
          points = 1;
        }else if(type==4 && name==12){
          // Queen of spades
           points = 13;
        }else if(type==2 && name==10){
          // 10 of diamonds
          points = 10;
        }
        const card = { name, type, points };
        cards.push(card);
      }
    }

    //shufflecards
    for (let i = 0; i < cards.length; i++) {
      const rand = Math.floor(Math.random() * cards.length);
      [cards[i], cards[rand]] = [cards[rand], cards[i]];
    }

    //creating decks
    const deck1 = cards.splice(0, 13);
    const deck2 = cards.splice(0, 13);
    const deck3 = cards.splice(0, 13);
    const deck4 = cards.splice(0, 13);

    const decks = [deck1, deck2, deck3, deck4];

    return decks

  };
    

export default generateCards