import React from 'react';
import { collection, doc, getDoc ,updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const PlayCard = async (card, userid, userID, tableID, num) => {
  const tablesRef = collection(db, 'tables');
  if (card) card.by = userID;
  try {
    const docRef = doc(tablesRef, tableID);
    const docSnap = await getDoc(docRef);
    const usersData = docSnap.data().usersData;
    const updatedUsersData = usersData.map((userData, index) => {
      if (index === userid) {
        const updatedDeck = userData.deck.map(obj => {
          if (obj.name === card.name && obj.type === card.type) {
            return { ...obj, played: true };
          }
          return obj;
        });

        return { ...userData, deck: updatedDeck};
      }
      return userData;
    });
    var turn = docSnap.data().turn
    if(turn==3)
      turn = 0
    else
      turn = docSnap.data().turn + 1
      
    if(num==0){
      await updateDoc(docRef, { usersData: updatedUsersData, turn, type:card?.type });
    }else{
      await updateDoc(docRef, { usersData: updatedUsersData, turn });
    }
    
  } catch (error) {
    console.log('Error Generating the deck', error);
  }
};

export default PlayCard;