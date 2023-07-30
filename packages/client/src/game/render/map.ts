import { Application, Container, Sprite, Assets, Graphics, SimplePlane } from 'pixi.js'
import { GodrayFilter } from '@pixi/filter-godray'

export class MapRender {
  constructor(container: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({
      backgroundAlpha: 0,
      resizeTo: container
    })
    container.appendChild(this.app.view)
  }
  app: Application<HTMLCanvasElement>

  async water(src: string) {
    const texture = await Assets.load(src)
    const plane = new SimplePlane(texture, 5, 5)
    plane.width = this.app.screen.width + 50
    plane.height = this.app.screen.height + 50
    plane.x = -15
    plane.y = -5
    const background = Sprite.from(src)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    this.app.stage.addChild(background)

    this.app.stage.addChild(plane)

    // Get the buffer for vertice positions.
    const buffer = plane.geometry.getBuffer('aVertexPosition')

    // Listen for animate update
    let timer = 0

    this.app.ticker.add(() => {
      // Randomize the vertice positions a bit to create movement.
      for (let i = 0; i < buffer.data.length; i++) {
        buffer.data[i] += Math.sin(timer / 15 + i) * 0.2
      }
      buffer.update()
      timer++
    })
  }
  async godray(src: string) {
    const background = Sprite.from(src)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    const filter1 = new GodrayFilter({
      time: 0,
      gain: 0.5,
      alpha:1,
      lacunarity: 3,
      parallel:false,
      angle: 30,
      center: [100,-100],
    })
    background.filters = [filter1]
    this.app.stage.addChild(background)
    this.app.ticker.add(()=>{
      filter1.time += 0.002
    })
  }
}
