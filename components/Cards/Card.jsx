import React from 'react'
import styles from "./Card.module.scss"
const Card = ({name,type}) => {
    const RenderType = () => {
        switch (type) {
            case 3:
                return "♥"
            case 1:
                return "♣"
            case 4:
                return "♠"
            case 2:
                return "♦"
            default:
                return "♠";
        }
    }
    const RenderColor = () => {
        switch (type) {
            case 1:
                return "black"
            case 2:
                return "red"
            case 3:
                return "red"
            case 4:
                return "black"
            default:
                return "black";
        }
    }
    const RenderName = () => {
        switch (name) {
            case 0:
                return "A"
            case 11:
                return "J"
            case 12:
                return "Q"
            case 13:
                return "K"
            case 14:
                return "A"
            default:
                return name;
        }
    }
  return (
    <div className={styles.wrapperr}>
        <div style={{color:RenderColor()}}className={styles.card}>
            <div className={styles.row1}>
                <div className={styles.l}>
                <p>{RenderName()}</p>
                <p>{RenderType()}</p>
                </div>
            </div>
            <div className={styles.row2}>
                <p>{RenderType()}</p>
            </div>
            <div className={styles.row3}>
                <div className={styles.r}>
                <p>{RenderName()}</p>
                <p>{RenderType()}</p>
                </div>
            </div>
            </div>
            <div className={styles.back}>
            <div className={styles.row1}/>
            <div className={styles.row2}/>
            <div className={styles.row3}/>
        </div>
    </div>
  )
}

export default Card