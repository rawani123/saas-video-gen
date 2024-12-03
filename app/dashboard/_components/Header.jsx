import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-1 px-5 flex items-center justify-between shadow-md'>
      <div className='flex gap-3 items-center'>
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2 className='font-bold text-md'>Ai Short Video</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
