// import { IMG_DIR } from '@hapi/common/constants'
import type { Character, Enemy, Skill } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'

import {
  Application,
  Container,
  Sprite,
  // Assets,
  Graphics,
  Text
  // Mesh,
  // Shader,
  // Geometry,
  // Texture,
  // RenderTexture
} from 'pixi.js'

export class SkillRender {
  constructor(public app: Application<HTMLCanvasElement>) {

  }
  exceute(skill: Skill) {
    // console.log('skill render',skill)
  }
}
