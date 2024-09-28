export function GameObject(position) {
  
  const render = function() {};
  const validatePosition = (position) => {
      if (Array.isArray(position)) {
        return position;
      } else {
        throw new Error("Position must be an array");
      }
    }
  var position = validatePosition(position);
  
  
  return {
    get position() {
        return position;
      },
      set position(newPosition) {
        position = validatePosition(newPosition)
      },
    render
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