import React from 'react'
import styles from "./acceptedRequested.module.css"
import UserCard from './components/UserCard'

const AcceptedRequests = () => {
  const buttons= [];
  return (
    <div>
      <UserCard buttons={buttons}/>
    </div>
  )
}

export default AcceptedRequests
