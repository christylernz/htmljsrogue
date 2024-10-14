
function createPosition(position) {

  const validatePosition = (position) => {
    if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  var myPosition = validatePosition(position);


  return {
    get position() { myPosition },
    set position(newPosition) { myPosition = newPosition },
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

  this

  Object.defineProperty(obj, 'myPosition', {
    enumerable: false,
    writable: true,
    configurable: true
  });
  return {
    ...createPosition(position),
    ...createRenderable("")
  }
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