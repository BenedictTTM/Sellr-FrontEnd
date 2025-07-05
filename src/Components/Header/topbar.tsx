'use client';
import React , {useState} from 'react'
import {  ChevronDown } from 'lucide-react';
const topbar = () => {
    const [ selectedLanguage, setSelectedLanguage ] = useState('English');
  return (
    <>
    <div className="bg-black text-gray-100 text-center py-2  font-light text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%{' '}
        <span className="font-semibold underline cursor-pointer px-5">ShopNow</span>
        
        {/* Language Selector */}
        <div className="absolute right-4 top-2 flex items-center gap-1 text-sm">
          <span>{selectedLanguage}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </>
  )
}

export default topbar