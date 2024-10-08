export const icons = {
    player: '@',
    coin: '$',
    potion: '*',
    chest: '!',
    empty: ' ',
    wall: '#',
    floor: '.',
};

export class GameObject {
  #name
  #position
  #symbol
  constructor(name, position, symbol){
    this.#name = this.#validateName(name);
    this.#position = this.#validatePosition(position);
    this.#symbol = symbol;
  }
  
  set name(name){
    this.#name = this.#validateName(name);
  }
  
  get name() {
    return this.#name;
  }
  
  get position() {
    return this.#position;
  }
  
  set position(position) {
    this.#position = this.#validatePosition(position);
  }
  
  get symbol() {
    return this.#symbol;
  }
  
  #validateName(name){
    //if (type of n) {}
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      throw new Error("Name is empty");
    }
    return name;
  }
  
  #validatePosition(position) {
    if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  
  render() {
    return this.#symbol;
  }
  
  
}