"use client"
import ProfileCard from '@/components/Profile/ProfileCard'
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

import { db } from "../../firebase"
import React from 'react'

function Profile() {
  //if login credentials of user disappear, revert back to login page
  const { user } = useAuth();


  return (
    <>
    <ProfileCard/>

    </>
  )
}

export default Profile