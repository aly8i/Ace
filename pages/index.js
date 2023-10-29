import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react";
import { useEffect,useContext, useState } from 'react'
import RandomCard from '../components/Cards/RandomCard'
import { UserContext } from '../context/UserContext'
import Searching from '../Screens/Searching/Searching';
import Play from '../Screens/Play/Play'
import Game from '../Screens/Game/Game';
import changeStatus from '../functions/changeStatus';
import handleStart from '../functions/handleStart';
import { fetchTable } from '../hooks/DataFetching';
export default function Home() {
  
  const { data,status } = useSession();
  const { view,table,id,setID } = useContext(UserContext);

  fetchTable();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      if(id!==""){
        console.log("id before sending" + id)
        navigator.sendBeacon(`${process.env.BASE_URL}/api/status/offline`, JSON.stringify({ id }));  
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id]);

  useEffect(()=>{
    console.log(table)
  },[table])

  useEffect(() => {
    const updateStatus = async () => {
      if (id === "") {
        return;
      } else if (view === "main") {
        await changeStatus("afk", id);
      } else if (view === "play"){
        await changeStatus("play", id);
      } else if (view === "searching") {
        await changeStatus("searching", id);
      } else if (view === "game") {
        await changeStatus("game", id);
      }
    };
  
    updateStatus();

    const destroy = () => {};
    return destroy;

  }, [view, id]);

  useEffect(()=>{
    if(data?.session?.user?.id){
      setID(data?.session?.user?.id)
      console.log(id)
    }
  },[data,status])
  
  if(status === "loading" || view=="searching")
  return(
    <main className={styles.main}>
      <Searching/>
    </main>
  )

  if(view=="main")
    return (
      <main className={styles.main}>
        <div className={styles.ad}>
          <RandomCard/>
        </div>
        <p className={styles.description}>
          <code className={styles.code}>Play and Earn Card Game</code>
        </p>
      </main>
    )
  if(view=="play")
    return(
      <main className={styles.main}>
        <Play/>
      </main>
    )
  if(view=="game")
    return(
      <main className={styles.main}>
        <Game/>
      </main>
    )
}
