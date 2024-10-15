

function createPosition(position) {

  const validatePosition = (position) => {
    console.log("validate:" + position)
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

function createRenderable(symbol) {
  return {
    render: () => {
      return symbol;
    }
  }
}

export function GameObject(position) {
  const gameObject = {};

  Object.defineProperties(gameObject, {
    ...Object.getOwnPropertyDescriptors(createPosition(position)),
    ...Object.getOwnPropertyDescriptors(createRenderable(""))
  });

  return gameObject;
}

export function SimpleObject(position, symbol = "@") {
  const simpleObject = {};

  Object.defineProperties(simpleObject, {
    ...Object.getOwnPropertyDescriptors(createPosition(position)),
    ...Object.getOwnPropertyDescriptors(createRenderable(symbol))
  });

  return simpleObject;
}