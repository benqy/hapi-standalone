import { uuidV4 } from '../util'

/**
 * 所有带ID的类的基类
 */
export default class O {
  readonly id = uuidV4()

  constructor() {}
}
