type NameProps = {
  ptBr: string
  en: string
}

type DropsProps = {
  MVPDrop?: boolean
  name: string
  rate: number
}

type AtkProps = {
  min: number
  max: number
}

type ElementProps = {
  level: number
  name: string
}

type ExpProps = {
  base: number
  job: number
}

type StatsProps = {
  agi: number
  atk: AtkProps
  def: number
  dex: number
  element: ElementProps
  exp: ExpProps
  flee: number
  hit: number
  hp: number
  int: number
  level: number
  luk: number
  mdef: number
  race: string
  size: string
  vit: number
}

type InfoProps = {
  drops: DropsProps[]
  stats: StatsProps
}

export type MonsterInfoData = {
  id: number
  info: InfoProps
  name: NameProps
}
