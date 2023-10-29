import React from 'react'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const generateCardsInTable = async(tableID) => {
    const tablesRef = collection(db,'tables');
    var cards = [];

    //create cards
    for (let type = 1; type <= 4; type++) {
      for (let name = 2; name <= 14; name++) {
        const card = { name, type };
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
    console.log(decks);

    try {
        const docRef = doc(tablesRef, `${tableID}`);
        const data = {
            decks
        } 
        await updateDoc(docRef, data);
    } catch (error) {
        console.log('Error Generating the deck', error);
    }
  };
    

export default generateCardsInTable