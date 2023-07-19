//种族
export abstract class Breed {
  constructor() {}
  name = '种族'
}

export class Human extends Breed {
  name = '人类'
}

export class PlayerBreed extends Breed {
  name = '玩家'
}

export class Orc extends Breed {
  name = '兽人'
}
