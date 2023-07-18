//种族
export abstract class Breed{
  constructor(){

  }
  name = '种族'
  get loottable(){
    return {}
  }
}

export class Human extends Breed{
  name = '人类'
  get loottable(){
    return {}
  }
}

export class PlayerBreed extends Breed{
  name = '玩家'
  get loottable(){
    return {}
  }
}

export class Orc extends Breed{
  name = '兽人'
  get loottable(){
    return {}
  }
}