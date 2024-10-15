
function createPosition(position) {

  const validatePosition = (position) => {
    console.log("validate:" + position )
    if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  let myPosition = validatePosition(position);


  return {
    get position() { return myPosition },
    set position(newPosition) { 
      myPosition = validatePosition(newPosition) },
  };
}

function createRenderable(symbol) {
  return {
    render: () => {
      return symbol;
    }
  }
}

export function GameObject(position) {
  const gameObject = {
    ...createPosition(position),
    ...createRenderable(""),
  };

  Object.defineProperty(gameObject, 'position', {
    get: gameObject.getPosition,
    set: positionMethods.setPosition,
    enumerable: true,
    configurable: true
  });

  return gameObject;
}

export function SimpleObject(position) {
  var gameObject = new GameObject(position);
  const render = () => {
    return "@";
  }
  return {
    get position() {
      return gameObject.position;
    },
    set position(newPosition) {
      gameObject.position = newPosition;
    },
    render
  }
}