'use client'

import { MonsterInfoData } from '@/@types/MonsterInfo'
import { AttributeList } from '@/app/components/AttributeList'
import { WhenDataLoading } from '@/app/components/WhenDataLoading'
import { api } from '@/app/services/api'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Page({ params }: { params: { id: string } }) {
  const { data: monsterData } = useQuery({
    queryKey: ['getMonster'],
    queryFn: async () => {
      const data = await api.get<MonsterInfoData>(`/monsters/info/${params.id}`)
      return data.data
    },
  })

  const { data: monsterImageData } = useQuery(
    ['getMonsterImage', params.id],
    async () => {
      const response = await api.get(`/monsters/image/${params.id}`, {
        responseType: 'blob',
      })
      const blob = response.data
      const reader = new FileReader()
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
    },
  )

  const { name, id, info } = monsterData || {}
  const { ptBr, en } = name || {}
  const { stats } = info || {}
  const {
    def,
    level,
    hp,
    hit,
    atk,
    mdef,
    size,
    race,
    flee,
    agi,
    vit,
    luk,
    int,
    dex,
    exp,
    element,
  } = stats || {}

  const attributes = [
    { title: 'Nome', value: ptBr },
    { title: 'Defesa', value: def },
    { title: 'Nível', value: level },
    { title: 'HP', value: hp },
    { title: 'Precisão', value: hit },
  ]

  const attributes2 = [
    { title: 'Ataque', value: atk?.max },
    { title: 'Defesa Mágica', value: mdef },
    { title: 'Tamanho', value: size },
    { title: 'Raça', value: race },
    { title: 'Esquiva', value: flee },
  ]

  const attributes3 = [
    { title: 'AGI', value: agi },
    { title: 'VIT', value: vit },
    { title: 'INT', value: int },
    { title: 'DES', value: dex },
    { title: 'SOR', value: luk },
  ]

  const attributes4 = [
    { title: 'Base', value: exp?.base },
    { title: 'Classe', value: exp?.job },
  ]

  if (!monsterData || !monsterImageData) {
    return <WhenDataLoading />
  }

  return (
    <motion.div
      className="container mt-32 p-4 md:mt-40"
      initial={{ opacity: 0, y: 250 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        type: 'spring',
      }}
    >
      <main>
        <strong className="flex flex-col gap-1 text-base">
          {ptBr}
          <span className="text-xs opacity-50">
            {id} / {en}
          </span>
        </strong>
        <div className="mt-4 h-[1px] w-full bg-zinc-900" />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded bg-gray-900 py-10 md:mt-20 md:grid md:grid-cols-3 md:items-baseline md:justify-items-center">
          <Image
            className="mt-auto"
            priority
            src={monsterImageData}
            alt={ptBr || ''}
            width={90}
            height={90}
          />

          <AttributeList attributes={attributes} />
          <AttributeList attributes={attributes2} />
          <AttributeList
            attributes={attributes3}
            isSpecialColumn
            columnTitle="atributos"
          />
          <AttributeList
            attributes={attributes4}
            isSpecialColumn
            columnTitle="experiência"
          />

          <AttributeList
            attributes={[]}
            isSpecialColumn
            columnTitle={`${element?.name}` + ' ' + element?.level}
          />
        </div>
      </main>
    </motion.div>
  )
}
