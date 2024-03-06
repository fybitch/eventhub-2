import React from 'react'
import Home from './Home'
import CreateEvent from './CreateEvent'
import Profile from './Profile'
import Events from './Events'
import Search from './Search'

const SidebarItems = () => {
  return (
    <>
        <Home/>
        <Search/>
        <CreateEvent/>
        <Events/>
        <Profile/>
    </>
  )
}

export default SidebarItems