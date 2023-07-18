import { nanoid } from 'nanoid'
/**
 * 所有带ID的类的基类
 */
export class O {
  readonly id = nanoid()

  constructor() {}
}

