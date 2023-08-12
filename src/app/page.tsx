'use client'

import { Monster } from '@/@types/Home'
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSnapshot } from 'valtio'
import { PoringCanvas } from './canvas/Poring'
import { MobCard } from './components/MobCard'
import { WhenDataLoading } from './components/WhenDataLoading'
import { api } from './services/api'
import { state } from './store'

// Tem apenas 34 páginas

export default function Home() {
  const snap = useSnapshot(state)

  const { data: MonstersData, isFetching } = useQuery({
    queryKey: ['getAllMonsters', snap.page],
    queryFn: async ({ queryKey }) => {
      const [, currentPage] = queryKey
      const data = await api.get<Monster[]>(
        `monsters/?page=${currentPage}&limit=${15}`,
      )
      return data.data
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const { data: MonstersSearchData } = useQuery({
    queryKey: ['getFilteredMonsters', snap.searchValue],
    queryFn: async ({ queryKey }) => {
      const [, searchValue] = queryKey
      if (searchValue) {
        const data = await api.get<Monster[]>(
          `/monsters/find/?search=${searchValue.toLocaleLowerCase()}`,
        )
        return data.data
      }
      return null
    },
    refetchOnWindowFocus: false,
  })

  const displayedMonsters = snap.searchValue ? MonstersSearchData : MonstersData

  if (!MonstersData) {
    return <WhenDataLoading />
  }

  return (
    <div className="container p-4">
      <div className="mt-40">
        <PoringCanvas />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-40 md:grid-cols-2 lg:grid-cols-3">
        {displayedMonsters &&
          displayedMonsters.map((monster, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              key={monster.id}
            >
              {isFetching ? (
                <div className="flex h-96 animate-pulse flex-col justify-between rounded-lg bg-zinc-800" />
              ) : (
                <Link passHref href={`/monsters/info/${monster.id}`}>
                  <MobCard
                    id={monster.id}
                    name={monster.name.ptBr.toLowerCase()}
                    englishName={monster.name.en}
                  />
                </Link>
              )}
            </motion.div>
          ))}
      </div>
      {displayedMonsters !== MonstersSearchData && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            className="disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              state.page -= 1
              window.scrollTo(0, 0)
            }}
            disabled={snap.page === 1}
          >
            <CaretCircleLeft size={30} />
          </button>

          <span className="rounded bg-gray-900 px-4 py-2">
            {snap.page} de {34}
          </span>

          <button
            className="disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              state.page += 1
              window.scrollTo(0, 0)
            }}
            disabled={snap.page === 34}
          >
            <CaretCircleRight size={30} />
          </button>
        </div>
      )}
    </div>
  )
}
