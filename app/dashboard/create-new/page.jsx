import React from 'react'
import SelectTopic from './_components/SelectTopic'

const CreateNew = () => {
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-primary text-4xl text-center'>Create New</h2>
      <div className='mt-10 p-10 shadow-md'>
        <SelectTopic />
      </div>
    </div>
  )
}

export default CreateNew
