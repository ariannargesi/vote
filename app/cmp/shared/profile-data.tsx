import React from 'react'
import Image from 'next/image'

export default function ProfileData ({date}: {date?: Date} ) {
    return (
        <div className="flex gap-x-2 items-center">
        <Image
          src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
          alt="user profile"
          width={42}
          height={42}
          className="rounded-full"
        />
        <span className="text-sm">alireza.jalili</span>
        {date && <span className="text-gray-400 text-xs">دیروز</span> }
      </div>
    )
}