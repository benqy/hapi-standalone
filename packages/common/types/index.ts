export * from './modifier'
export type LootTableItem = { rate: number; id: string }
export type Category = {
  name: string
  code: string
  parent:string | null
}