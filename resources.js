export const icons = {
    player: '@',
    coin: '$',
    potion: '*',
    chest: '!',
    empty: ' ',
    wall: '#',
    floor: '.',
};


export function NameProperty(name) {
  let myName;
  
  const validateName =  (name) =>  {
    if (typeof name !== 'string') {
      throw new Error("Name must be a string");
    }
    
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      throw new Error("Name is empty");
    }
    return name;
    
  }
  myName = validateName(name);
  return {
    get name() { return myName; }, 
    set name(name) { myName = validateName(name); }
  }
}

export function RenderProperty(symbol){
  let mySymbol = symbol;
  return {
    render: () => { return mySymbol;}
  }
}

export function PositionProperty(position) {
  const validatePosition = (position) => {
  if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  let myPosition = validatePosition(position);
  return {
    get position() { return myPosition }, 
    set position(newPosition) { myPosition = validatePosition(newPosition) }, 
  }
}

export function PlayerEntity(positionProperty, renderProperty ) {
  const player = {};
  
  Object.defineProperties(player, {
    ...Object.getOwnPropertyDescriptors(positionProperty),
    ...Object.getOwnPropertyDescriptors(renderProperty)
  });
  
  return player;
}