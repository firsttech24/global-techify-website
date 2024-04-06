import React from 'react'
import UserCard from './components/UserCard'

const RequestPage = () => {
  const buttons = ["Accept", "Ignore"];
  return (
    <div>
       <UserCard buttons={buttons}/>
    </div>
  )
}

export default RequestPage
