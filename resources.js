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
  constructor(name){
    this.#name = this.#validateName(name);
  }
  
  set name(name){
    this.#name = this.#validateName(name);
  }
  
  get name() {
    return this.#name
  }
  
  #validateName(name){
    //if (type of n) {}
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      throw new Error("Name is empty");
    }
    return name;
  }
}