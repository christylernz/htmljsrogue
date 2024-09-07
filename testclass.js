export class GameObject {
  #position 
  constructor(position) {
    this.#position = position;
  }
  get position() {
    return this.#position;
  }
  set position(newPosition) {
    this.#position = newPosition;
  }
  
  render() {}
}

export class SimpleObject extends GameObject {
  
  render() {
    return "@";
  }
}