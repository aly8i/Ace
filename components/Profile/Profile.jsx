import React from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import styles from "./Profile.module.scss"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareIcon from '@mui/icons-material/Share';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { signOut,useSession } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link';

const Profile = () => {
  
  const { data,status } = useSession();

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.info}>
                <Image className={`${styles.profileImg} ${styles.img}`} width={180} height={180} src={data?.session?.user?.image} alt=""/>
                <div className={styles.section}>
                    <Link href={`/users/profile/${data?.session?.user?.id}`} >
                        <div className={styles.nameWrapper}>
                            <p className={styles.name}>{data?.session?.user?.name}</p>
                        </div>
                    </Link>
                    <div className={styles.balanceWrapper}>
                        <p className={styles.balance}>{data?.session?.user?.balance}</p>
                        <AttachMoneyIcon className={styles.dollar}/>
                    </div>
                    <div className={styles.sectionsub}>
                        <div className={styles.button}>
                            <MeetingRoomIcon onClick={()=>{signOut()}} />
                        </div>
                        <div className={styles.button}>
                            <ShareIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <ChatBubbleIcon className={styles.icon}/>
        </div>
    </div>
  )
}

export default Profile