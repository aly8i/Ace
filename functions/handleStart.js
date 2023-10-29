import React from 'react';
import { collection, doc, query, where, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import generateCards from './generateCards';

const handleStart = async (bet, id) => {
    const usersRef = collection(db, 'users');
    const tablesRef = collection(db, 'tables');

    try {
        const docRef = doc(usersRef, `${id}`);
        const data = {
            bet,
            status: "searching"
        };
        await updateDoc(docRef, data);
        const usersQuery = query(usersRef, where('bet', '==', bet), where('status', '==', 'searching'));
        const querySnapshot = await getDocs(usersQuery);
        if (querySnapshot.size >= 4) {  
            var users = [];
            var images = [];
            let count = 0;
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                if (count < 4) {
                    const userId = querySnapshot.docs[i].id;
                    const userRef = doc(usersRef, userId);
                    await updateDoc(userRef, { status: 'game' });
                    users.push(userId);
                    images.push(querySnapshot.docs[i].data().image)
                    count++;
                }
            }
            const decks = await generateCards();
            const usersData = [
                {
                    id:users[0],
                    image:images[0],
                    deck:decks[0],
                    score:0,
                    points:0
                },
                {
                    id:users[1],
                    image:images[1],
                    deck:decks[1],
                    score:0,
                    points:0
                },
                {
                    id:users[2],
                    image:images[2],
                    deck:decks[2],
                    score:0,
                    points:0
                },
                {
                    id:users[3],
                    image:images[3],
                    deck:decks[3],
                    score:0,
                    points:0
                },
            ]
            console.log(usersData)
            const turn = Math.floor(Math.random() * 4);
            const data2 = { users, bet, round:0,usersData,turn,type:0,shuffle:-1,total:0 }
            await addDoc(tablesRef, data2);
        }
    } catch (error) {
        console.log('Error fetching documents:', error);
    }
}

export default handleStart;