
//每帧会进行行动的单位
export interface IActor {
  maxHealth: number,
  name: string,
  currentHealth: number,
  doTick(): void
  doAction(): void
}
