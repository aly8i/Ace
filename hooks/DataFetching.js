import { useEffect, useContext, useState } from 'react';
import { collection, query, where, doc, onSnapshot,getDocs, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { UserContext } from '../context/UserContext'


export const fetchTable = () => {
  const { setTable,view,setView,id } = useContext(UserContext);
  const tablesRef = collection(db, 'tables');

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const tablesQuery = query(tablesRef, where('users', 'array-contains', id));

        const unsubscribe = onSnapshot(tablesQuery, (snapshot) => {
          if (!snapshot.empty) {
            const firstDocument = snapshot.docs[0];
            const id = firstDocument.id;
            const data = firstDocument.data();
            console.log({ id, ...data });
            setTable({id, ...data })
            setView('game')
            console.log("view is game")
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log('Error fetching documents:', error);
      }
    };

    fetchTable();
  }, [id]); 

};