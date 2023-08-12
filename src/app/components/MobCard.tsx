import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { api } from '../services/api'

type MobCardProps = {
  name: string
  id: number
  englishName: string
}

export const MobCard = ({ name, id, englishName }: MobCardProps) => {
  const { data: monsterImageData } = useQuery(
    ['getMonsterImage', id],
    async () => {
      const response = await api.get(`/monsters/image/${id}`, {
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

  return (
    <div className="flex h-96 flex-col justify-between rounded-lg bg-zinc-800">
      <div className="mx-auto mt-auto">
        {monsterImageData && (
          <Image
            priority
            src={monsterImageData}
            alt={name}
            width={80}
            height={80}
          />
        )}
      </div>
      <div className="text p-4">
        <strong className="flex flex-col gap-1 text-base capitalize">
          {name}{' '}
          <span className="text-xs opacity-50">
            {id} / {englishName}
          </span>
        </strong>
      </div>
    </div>
  )
}
