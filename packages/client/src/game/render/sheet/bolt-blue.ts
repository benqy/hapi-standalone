import { IMG_DIR } from "@hapi/common/constants";
export const boltBlue = {
  frames: {
    'bolt1.png': {
      frame: { x: 1, y: 1, w: 47, h: 26 },
      rotated: false,
      trimmed: true,
      spriteSourceSize: { x: 1, y: 2, w: 47, h: 26 },
      sourceSize: { w: 48, h: 32 }
    },
    'bolt2.png': {
      frame: { x: 1, y: 29, w: 46, h: 28 },
      rotated: false,
      trimmed: true,
      spriteSourceSize: { x: 2, y: 1, w: 46, h: 28 },
      sourceSize: { w: 48, h: 32 }
    },
    'bolt3.png': {
      frame: { x: 1, y: 59, w: 46, h: 23 },
      rotated: false,
      trimmed: true,
      spriteSourceSize: { x: 2, y: 2, w: 46, h: 23 },
      sourceSize: { w: 48, h: 32 }
    },
    'bolt4.png': {
      frame: { x: 1, y: 84, w: 46, h: 19 },
      rotated: false,
      trimmed: true,
      spriteSourceSize: { x: 2, y: 6, w: 46, h: 19 },
      sourceSize: { w: 48, h: 32 }
    }
  },
  animations: {
    fireball: ['bolt1.png', 'bolt2.png', 'bolt3.png', 'bolt4.png']
  },
  meta: {
    app: 'https://www.codeandweb.com/texturepacker',
    version: '1.1',
    image: `${IMG_DIR}/skill/bolt-blue.png`,
    format: 'RGBA8888',
    size: { w: 49, h: 104 },
    scale: '1',
    smartupdate:
      '$TexturePacker:SmartUpdate:bd6c9d8a38ab76ce7d1399a1fb1d56e3:b1f769bc30c473110d8567e489d2c7b2:2fb2a7ca693bcb4c12bc93c070f90097$'
  }
}
