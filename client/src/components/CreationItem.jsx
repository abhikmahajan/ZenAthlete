import React, { useState } from 'react'
import Markdown from 'react-markdown'
const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false)



  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-gray-800 text-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{item.prompt}</h2>
                <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-black border border-[#BFDBFE] text-white flex items-center justify-center w-72 rounded-full'>{item.type}</button>
        </div>

        {
            expanded && (
                <div>
                    {item.type === 'image' ?(
                        <div>
                            <img src={item.content} alt='image' className='mt-3 w-full max-w-md'/>
                        </div>
                    ):(
                        <div className='mt-3 h-100 overflow-y-scroll text-sm text-white'>
                            <div className='reset-tw'>
                                <Markdown>
                                    {item.content}
                                </Markdown>
                            
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    </div>
  )
}

export default CreationItem