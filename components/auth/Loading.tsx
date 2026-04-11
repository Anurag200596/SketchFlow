import Image from "next/image";

import React from 'react'

const Loading = () => {
  return (
    <div className="h-screen max-h-screen w-full flex flex-col items-center justify-center">
        <Image 
        alt="logo"
        src="./logo.svg"
        height={120}
        width={120}
        loading="eager"
        className="animate-pulse duration-700"
        />
      
    </div>
  )
}

export default Loading
