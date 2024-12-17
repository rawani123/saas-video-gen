"use client"

import { CircleUser, FileVideo, Image, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

const SideNav = () => {

    const pathName = usePathname();

  const MenuOptions= [
    {
      id:1,
      name:'Dashboard',
      path:'/dashboard',
      icon: PanelsTopLeft
    },
    {
      id:2,
      name: ' Create New',
      path:'/dashboard/create-new',
      icon: FileVideo
    },
    
    {
      id:3,
      name:'Image Generator',
      path:'/dashboard/image-generator',
      icon: Image
    }
  ]
  return (
    <div className='w-64 h-screen shadow-md p-5'>
      <div>
        {MenuOptions.map((option) => (
          <Link href={option.path} key={option.id}>
          <div key={option.id} className={`flex items-center gap-3 my-2 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer ${pathName==option.path && 'bg-primary text-white'}`}>
            <option.icon size={24} />
            <span>{option.name}</span>
          </div>
          </Link>
        )
        )}
      </div>
    </div>
  )
}

export default SideNav
