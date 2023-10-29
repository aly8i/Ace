import React from 'react';
import { collection, doc, getDoc ,updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import generateCards from './generateCards';

const addPoints = async (highestIndex, points, tableID, shuffle) => {

  const tablesRef = collection(db, 'tables');
  
  try {
    const docRef = doc(tablesRef, tableID);
    const docSnap = await getDoc(docRef);
    const usersData = docSnap.data().usersData;
    const updatedUsersData = usersData.map((userData, index) => {
      const updatedDeck = userData.deck.filter(card => !card.played);
      if (index === highestIndex) {
        var updatedPoint = userData.points + points
        return { ...userData, points:updatedPoint,deck:updatedDeck};
      }
      return { ...userData, deck:updatedDeck };
    });
    var total = docSnap.data().total
    total +=1;
    if(shuffle){
      await updateDoc(docRef, { usersData: updatedUsersData, total ,type:0 ,turn:highestIndex, shuffle:highestIndex });
    }else{
      await updateDoc(docRef, { usersData: updatedUsersData, total ,type:0 ,turn:highestIndex });
    }
    if(total%13===0){
      //NEW SHUFFLE GENERATE NEW CARDS WITH TURN SHUFFLE + 1
      const newDecks = await generateCards();
      const updatedUsersDataWithNewDecks = usersData.map((userData, index) => {
          return { ...userData, deck:newDecks[index]};
      });
      var newturn = docSnap.data().shuffle
      if(newturn==3){
        newturn=0
      }else{
        newturn += 1
      }
      await updateDoc(docRef, { usersData: updatedUsersDataWithNewDecks , type:0 , turn: newturn, shuffle: -1 });

      shuffle(tableID);
    }
    
  } catch (error) {
    console.log('Error Adding Points', error);
  }
};

export default addPoints;