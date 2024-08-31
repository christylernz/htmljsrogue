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
  constructor(name, position){
    this.#name = this.#validateName(name);
    this.#position = this.#validatePosition(position);
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
}