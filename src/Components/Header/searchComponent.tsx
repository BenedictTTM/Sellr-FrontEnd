import React from 'react'
import { Search } from 'lucide-react'

const searchComponent = () => {
  return (
    <>
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-5 py-2 bg-gray-100  rounded-sm">
            <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-40"
            />
             <Search className="w-4 h-4 text-gray-500" />
        </div>
    </>
  )
}

export default searchComponent