import { Application } from 'pixi.js'
import { MapType } from '@hapi/common/enum'
import { MapRender } from './map'
import { IMG_DIR } from '@hapi/common/constants'
import { EntityRender } from './entities'
import { SkillRender } from './skill'

export class SceneRender {
  constructor() {
    this.htmlContainer = document.querySelector('.combat-scene')
    this.mapRender = new MapRender(this.htmlContainer)
    this.app = new Application<HTMLCanvasElement>({
      backgroundAlpha: 0,
      resizeTo: this.htmlContainer,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    })
    this.htmlContainer.appendChild(this.app.view)
    this.entityRender = new EntityRender(this.app)
    this.skillRender = new SkillRender(this.app)
  }
  htmlContainer: HTMLElement
  private mapRender: MapRender
  entityRender: EntityRender
  skillRender: SkillRender
  
  private app: Application<HTMLCanvasElement>

  renderMap(mapType: string) {
    switch (mapType) {
      case MapType.sea:
        this.mapRender.water(`${IMG_DIR}/map/sea.png`)
        break
      case MapType.desert:
        this.mapRender.godray(`${IMG_DIR}/map/desert.png`)
        break
      default:
        this.mapRender.water(`${IMG_DIR}/map/sea.png`)
        break
    }
  }

  clear() {
    this.htmlContainer.innerHTML = ''
    console.log('clear scene')
  }
}
