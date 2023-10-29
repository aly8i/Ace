import React from 'react'
import styles from './backCard.module.scss'

const backCard = ({flip = false}) => {
    var height1, width1, angel1, angel2;
    if (flip) {
      height1 = "67px";
      width1 = "100px";
      angel1 = "270deg";
      angel2 = "270deg";
    } else {
      angel1 = "none";
      angel2 = "none";
      height1 = "100px";
      width1 = "67px";
    }
    return (
        <div>
            <div style={{ height: height1, width: width1 }} className={styles.card}>
                <div className={styles.row1}>
                    <div className={styles.l} style={{ rotate: angel1 }}>
                    <p>▲</p>
                    </div>
                </div>
                <div className={styles.row2}>
                    <p>✴</p>
                </div>
                <div className={styles.row3}>
                    <div className={styles.r} style={{ rotate: angel2 }}>
                    <p>▲</p>
                    </div>
                </div>
                </div>
                <div className={styles.back}>
                <div className={styles.row1} />
                <div className={styles.row2} />
                <div className={styles.row3} />
            </div>
        </div>
        )
}

export default backCard