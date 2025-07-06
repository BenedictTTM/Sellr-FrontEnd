'use client'
import React from 'react'
import SearchComponent from './searchComponent'
import NavLinks from '../Navigation/navLinks' // Import your navLinks component
import { PiPlug } from "react-icons/pi";

const mainNavBar = () => {
 return (
    <nav className="flex items-center justify-between px-10 py-4 shadow-sm bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold text-gray-700">
  <span className='text-red-500'>my </span> Plug
  <PiPlug className="text-2xl text-gray-700 ml-2" />
</div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 ">
        <NavLinks href="/">Home</NavLinks>
        <NavLinks href="/contact">Contact</NavLinks>
        <NavLinks href="/about">About</NavLinks>
        <NavLinks href="/auth/signUp">Sign Up</NavLinks>
      </ul>

      {/* Search and Icons */}
      <div className="flex items-center space-x-6 px-4 sm:px-7 md:px-13 lg:px-17 xl:px-22 2xl:px-30">

        {/* Search Bar */}
          <SearchComponent />
      </div>
    </nav>
  );
}

export default mainNavBar