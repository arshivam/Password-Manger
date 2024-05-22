import React from 'react'

function Navbar() {
  return (
    <div className=' flex justify-between items-center bg-slate-800 text-white font-bold p-3'>
        <div className='px-4'>
          <span className='text-green-500'>&lt; </span>
          Pass<span className='text-green-500'>Op </span>
         <span className='text-green-500'>/&gt;</span>
         </div>
        <diV className='bg-green-500 hover:bg-green-300 hover:cursor-pointer rounded-full px-2 py-1 border border-1'><button>Github</button></diV>
    </div>
  )
}

export default Navbar