import React from 'react'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const changeStatus = async(status,id) => {
    const usersRef = collection(db,'users');

    try {
        const docRef = doc(usersRef, `${id}`);
        const data = {
            status: status
        }
        await updateDoc(docRef, data);
    } catch (error) {
        console.log('Error Changing Status documents:', error);
    }
    
}

export default changeStatus