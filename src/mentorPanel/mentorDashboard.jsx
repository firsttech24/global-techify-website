import React from 'react'
import Sidebar from './components/Sidebar'
import styles from './mentordashboard.module.css'
import UserCard from './components/UserCard'
import {Outlet} from "react-router-dom"

const MentorDashboard = () => {
  return (
    <div className={styles.dashboard}>
        <div>
            <Sidebar/>
        </div>
        <div className={styles.mainDashboard}>
            <Outlet/>
        </div>
    </div>
  )
}

export default MentorDashboard
