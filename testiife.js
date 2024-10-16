function createPosition(position) {

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

function createRenderable(symbol) {
  return {
    render: () => {
      return symbol;
    }
  }
}
export var GameObject = (function() {
  //  private stuff would go here
  //  shared by all instances
  
  return function(position) {
    // per-instance private vars here
    const gameObject = {};
    
    Object.defineProperties(gameObject, {
      ...Object.getOwnPropertyDescriptors(createPosition(position)),
      ...Object.getOwnPropertyDescriptors(createRenderable(""))
    });
    
    return gameObject;
  }
})();

export var SimpleObject = (function() {
  
  return function(position, symbol = "@") {
    const gameObject = {};
    
    Object.defineProperties(gameObject, {
      ...Object.getOwnPropertyDescriptors(createPosition(position)),
      ...Object.getOwnPropertyDescriptors(createRenderable(symbol))
    });
    
    return gameObject;
  }
})();
