import React from 'react'
import { collection, doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const finishGame = async(tableID) => {

    try {
        const usersRef = collection(db,'users');
        const tablesRef = collection(db,'tables');
        const tableDoc = doc(tablesRef, tableID);
        const tableSnap = await getDoc(tableDoc);
        const usersData = tableSnap.data().usersData;

        var usersPoints = [];

        usersData.map((userData, i) => {
            usersPoints[i]={id:usersData?.users[i],points:userData?.points}
        })
        const sortedUserPoints = usersPoints.sort((a, b) => a.points - b.points);
        //asc 01 winns
        const user1Ref = doc(usersRef, `${sortedUserPoints[0].id}`);
        const user2Ref = doc(usersRef, `${sortedUserPoints[1].id}`);
        const user1Snap = await getDoc(user1Ref);
        const user2Snap = await getDoc(user2Ref);
        var balance1 = await user1Snap.data().balance;
        var balance2 = await user2Snap.data().balance;
        balance1 += tableSnap.data().bet;
        balance2 += tableSnap.data().bet;
        await updateDoc(user1Ref,{balance:balance1});
        await updateDoc(user2Ref,{balance:balance2});

    } catch (error) {
        console.log('Error Finishing the Game:', error);
    }
    
}

export default finishGame