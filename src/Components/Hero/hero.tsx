import React from 'react'
import heroDarkBackground from '../../../public/heroDarkBackground.png'
import darkBackGround from '../../../public/DarkBackGround.png'
import Image from 'next/image'

const hero = () => {
  return (
    <>
        <div className="relative w-full h-[500px]">
            <Image
            src={heroDarkBackground}
            alt="Hero Background"
            fill
            className="object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
            <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
            </div>
        </div>
        <div className="relative w-full h-[500px]">
            <Image
            src={darkBackGround}
            alt="Dark Background"
            fill
            className="object-cover"
            />
        </div> 
    </>
  )
}

export default hero