export var GameObject = (function() {
  //  private stuff would go here
  //  shared by all instances
  return function(position) {
    // per-instance private vars here
    const render = () => {};
    console.log(position);
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
})();

export var SimpleObject = (function() {
  return function(position) {
    var gameObject = new GameObject(position);
    const render = () => {
      return "@";
    }
    return {
     ...gameObject, 
      render
    }
  }
})();
