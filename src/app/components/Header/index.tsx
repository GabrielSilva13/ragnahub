'use client'

import { state } from '@/app/store'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSnapshot } from 'valtio'

export const Header = () => {
  const pathName = usePathname()
  const snap = useSnapshot(state)

  return (
    <header className="fixed top-0 z-50 h-fit w-full bg-zinc-900 md:h-20">
      <div className="container flex flex-col items-center justify-between gap-3 p-4 md:flex-row">
        <Link passHref href="/">
          <strong className="text-2xl font-normal tracking-wide">
            Ragna
            <span className="rounded bg-hub-orange px-2 font-medium text-zinc-900">
              Hub
            </span>
          </strong>
        </Link>

        {pathName === '/' && (
          <div className="relative w-full max-w-sm">
            <label
              htmlFor="search"
              className="absolute right-2 top-1 text-zinc-400"
            >
              <MagnifyingGlass size={24} />
            </label>
            <input
              id="search"
              type="text"
              value={snap.searchValue}
              onChange={(e) => (state.searchValue = e.target.value)}
              placeholder="Procurar"
              className="h-8 w-full max-w-sm rounded-md px-4 text-sm text-zinc-900 placeholder:font-sans placeholder:text-sm placeholder:font-medium focus:outline-none focus:ring focus:ring-hub-orange"
            />
          </div>
        )}
      </div>
      <div className="flex h-11 items-center justify-center gap-2 bg-zinc-800 p-4">
        <Image
          priority
          src={'/poring-gif.gif'}
          className="mb-4 w-full max-w-[100px] object-cover"
          alt={'poring'}
          width={40}
          height={40}
        />

        <span className="text-sm">
          Nossa base de dados está em construção, tenha paciência 😘
        </span>

        <Image
          priority
          src={'/poring-gif.gif'}
          className="mb-4 hidden w-full max-w-[100px] object-cover md:block"
          alt={'poring'}
          width={40}
          height={40}
        />
      </div>
    </header>
  )
}
