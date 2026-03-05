import React from 'react'
import notfound from "@/public/notfound/404notfound.png";
import Image from 'next/image';

function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image
        src={notfound}
        alt="not found"
        className="w-[1000px] h-auto"
        priority
      />
    </div>
  )
}

export default Page