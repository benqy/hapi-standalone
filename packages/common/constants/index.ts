export const SOCKET_PORT: number = 2567
export const SOCKET_HOST: string = 'localhost'
export const SOCKET_URL: string = `ws://${SOCKET_HOST}:${SOCKET_PORT}`
export const ACCESS_TOKEN_KEY: string = 'ACCESS_TOKEN'
export const ROOM_GAME: string = 'game_room'
export const ROOM_AUTH: string = 'auth_room'
export const BASE_DROP_CHANCE = 0.16

//消息类型
export enum F {
  AUTH_JOIN = 'AUTH_JOIN',
  G_JOIN = 'G_JOIN',
}

// export const EQUIP_TYPES = {
//   helment: 'helment',
//   shoulder: 'shoulder',
//   body: 'body',
//   glove: 'glove',
//   ring: 'ring',
//   weapon: 'weapon',
//   amulet: 'amulet',
//   belt: 'belt',
//   trousers: 'trousers',
//   boot: 'boot',
//   offhand: 'offhand',
//   // jewel: 'jewel',
// }

// export const EQUIP_TYPE_LIST = Object.keys(EQUIP_TYPES)