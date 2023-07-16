import random from 'random'
import { names1, names2, names3 } from '../data/names'

export const randomName = () => {
  return `${random.choice(names1)}${random.choice(names2)}${random.choice(
    names3
  )}`
}
export const randomBetween = (min: number, max: number) => {
  return random.int(min, max)
}
export function choice<T>(arr: T[]) {
  return random.choice(arr)
}

export function randomFromArrayNRemove<T>(array: T[]) {
  const index = Math.floor(Math.random() * array.length)
  const item = array[index]
  array.splice(index, 1)
  return item
}
