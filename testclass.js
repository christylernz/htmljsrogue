export class GameObject {
  #position 
  constructor(position) {
    this.#position = this.#validatePosition(position);
  }
  get position() {
    return this.#position;
  }
  set position(newPosition) {
    this.#position = this.#validatePosition(newPosition);
  }
  #validatePosition(position) {
    if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  render() {}
}

export class SimpleObject extends GameObject {
  #symbol
  constructor(position, symbol = "@" ) {
    super(position);
    this.#symbol = symbol;
  }
  render() {
    return this.#symbol;
  }
}