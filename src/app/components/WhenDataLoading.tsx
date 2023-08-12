import Image from 'next/image'
import React from 'react'

export const WhenDataLoading = () => {
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-4 p-4">
      <Image
        priority
        src={'/poring-gif.gif'}
        className="mb-4 w-full max-w-[100px] object-cover"
        alt={'poring'}
        width={60}
        height={60}
      />
      <h1 className="text-xl">Carregando...</h1>
    </div>
  )
}
