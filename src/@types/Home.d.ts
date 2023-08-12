type MonsterNameProps = {
  ptBr: string
  en: string
}

export type Monster = {
  id: number
  name: MonsterNameProps
  hasMore?: boolean
}
