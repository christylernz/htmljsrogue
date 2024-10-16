class Position {
  #position;
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
}

class Renderable {
  #symbol
  constructor(symbol) {
    this.#symbol = symbol;
  }
  render() {
    return this.#symbol;
  }
}


export class GameObject {
  #position
  #render
  constructor(position) {
    this.#position = new Position(position);
    this.#render = new Renderable("")
  }
  get position() {
    return this.#position.position;
  }
  set position(newPosition) {
    this.#position.position = newPosition;
  }
  render() { this.#render.render() }
}

export class SimpleObject {
  #position
  #render
  constructor(position, symbol = "@") {
    this.#position = new Position(position);
    this.#render = new Renderable(symbol)
  }
  get position() {
    return this.#position.position;
  }
  set position(newPosition) {
    this.#position.position = newPosition;
  }
  render() {
    return this.#render.render();
  }
}