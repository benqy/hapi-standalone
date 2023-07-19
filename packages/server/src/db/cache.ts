import { RoomState } from '@hapi/common'
import { LRUCache } from 'lru-cache'
const options = {
  max: 500,

  // for use with tracking overall storage size
  // maxSize: 5000,
  // sizeCalculation: (value:any, key:any) => {
  //   return 1
  // },

  // // for use when you need to clean up something when objects
  // // are evicted from the cache
  // dispose: (value, key) => {
  //   freeFromMemoryOrWhatever(value)
  // },

  // how long to live in ms
  ttl: 1000 * 60 * 5,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  // async method to use for cache.fetch(), for
  // stale-while-revalidate type of behavior
  // fetchMethod: async (key, staleValue, { options, signal, context }) => {},
}
const lruCache = new LRUCache(options)
const CACHE_KEY = 'CACHE_KEY'

export type GameRoomStates = {
  [x: string]: RoomState.Game
}

//根据房间用户id缓存房间
// export const roomCache: Map<string, RoomState.Game> = new Map()

export const cache = {
  get<T>(key: string): T | undefined {
    const v = lruCache.get(`${CACHE_KEY}:${key}`)
    if (v) {
      return v as T
    } else {
      return undefined
    }
  },
  set(key: string, value: any) {
    return lruCache.set(`${CACHE_KEY}:${key}`, value)
  },
}
