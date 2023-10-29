import React, { useEffect } from 'react'
import Card from '../../components/Cards/Card'
import styles from "./Searching.module.scss"
const Searching = () => {
  return (
    <div className={styles.main}>
        <div className={styles.wrapper1}>
            <Card type={1} name={14}/>
        </div>
        <div className={styles.wrapper2}>
            <Card type={2} name={14}/>
        </div>
        <div className={styles.wrapper3}>
            <Card type={3} name={14}/>
        </div>
        <div className={styles.wrapper4}>
            <Card type={4} name={14}/>
        </div>
    </div>
  )
}

export default Searching