import React from 'react'
import styles from "./Topbar.module.scss"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import logo2 from "../../public/aceee.png"
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect,useContext } from 'react';
import { useSession } from "next-auth/react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Profile from '../Profile/Profile';
import Signin from '../Signin/Signin';
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
    const { data,status } = useSession();
    const [topBarState,setTopBarState] = useState('none')
    const { view,setView } = useContext(UserContext);

    const toggleSignin = ()=>{
        if(topBarState=="none"){
            setTopBarState("signin");
        }else{
            setTopBarState("none");
        }
    }
    const toggleProfile = ()=>{
        if(topBarState=="none"){
            setTopBarState("profile");
        }else{
            setTopBarState("none");
        }
    }

    const getLinks = () =>{
        return(
            <>
              <div onClick={()=>{setView("main")}} className={view=="/"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Home</div>
              <div onClick={()=>{setView("play")}} className={view=="/play"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Play</div>
              <div onClick={()=>{setView("news")}} className={view=="/news"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>News</div>
            </>
        )
    }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
            
            <Image src={logo2} alt="" width={70} height={70}/>
        </div>
        <div className={styles.headerMenu}>
            {getLinks()}
        </div>
        <div className={styles.hamburger}>
            <MenuIcon className={styles.hamburgerImage} onClick={()=>toggleMenu()}/>
        </div>
        <div className={styles.headerProfile}>
          <div className={styles.message}>
              <ModeCommentIcon/>
          </div>
            <div className={styles.notification}>
                <span className={`${styles.notificationNumber} ${styles.span}`}>3</span>
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`${styles.feather} ${styles.svg} ${styles.featherBell}`}>
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                </svg>
            </div>
            
            {
              data?.session?.user?
              (
                    <div className={styles.imageCon}>
                        <Image className={`${styles.profileImg} ${styles.img}`} onClick={()=>toggleProfile()} alt="" width={30} height={30} src={data?.session?.user?.image}/>
                    </div>
              )
              :(< LockOpenIcon onClick={()=>toggleSignin()} className={styles.lock}/>)
            }
            </div>
          </div>
        {topBarState=="profile"&&<Profile/>}
        {topBarState=="signin"&&<Signin/>}
    </>
  )
}

export default Navbar