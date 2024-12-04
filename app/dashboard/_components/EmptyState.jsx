import { Button } from '@/components/ui/button'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-4 border-dashed'>
      <h2>You dont have any short video created</h2>
      <Button>+ Create New Short Video</Button>
    </div>
  )
}

export default EmptyState
