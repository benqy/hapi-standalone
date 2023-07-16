export type TierLimit = {
  weapon: boolean
  helment: boolean
  shoulder: boolean
  body: boolean
  glove: boolean
  trousers: boolean
  boot: boolean
  amulet: boolean
  belt: boolean
  ring: boolean
  shield: boolean
}

export type AffixSchema = {
  id: string
  groupId: string
  name: string
  valuePath: string
  desc: string
  tags: string[]
  minValue: number
  maxValue: number
  tier: number
  tierName: string
  func: Function
  position: number
  tierLimit: TierLimit
}
