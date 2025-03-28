"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


function Header() {
  const {data: session} = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      
    }
  }

  return (
    <div>
      <button onClick={handleSignOut}>
        SignOut
      </button>
    </div>
  )
}

export default Header