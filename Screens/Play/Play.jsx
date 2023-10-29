import React, { useEffect, useState,useContext } from 'react'
import styles from './Play.module.scss'
import { Slider } from '@mui/material'
import handleStart  from '../../functions/handleStart'
import { useSession } from 'next-auth/react'
import { UserContext } from '../../context/UserContext'
const Play = () => {
    const [bet1,setBet1] = useState(500)
    const {data,status} = useSession();
    const { setBet,setStatus,setView } = useContext(UserContext);
    const startBtn = async() => {
        setBet(bet1);
        setStatus('searching');
        setView('searching');
        await handleStart(bet1,data?.session?.user?.id);
    }

    useEffect(()=>{
        console.log(data)
    },[data])

  return (
    <div className={styles.wrapper}>
        <div className={styles.topSection}>
            <div className={styles.topSectionText}>Place Bet</div>
            <div className={styles.sliderCon}>
                <Slider
                    className={styles.slider}
                    defaultValue={500}
                    getAriaValueText={(val)=>`${val} K lira`}
                    valueLabelFormat={(val)=>`${val} K lira`}
                    value={bet1}
                    onChange={(e,val)=>setBet1(val)}
                    valueLabelDisplay="auto"
                    step={100}
                    marks
                    min={200}
                    max={1000}
                />
            </div>
        </div>
        <div className={styles.startGame} onClick={async() => await startBtn() }>
            <p className={styles.p}>Start</p>
        </div>
    </div>
  )
}

export default Play