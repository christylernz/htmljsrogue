export var GameObject = (function() {
  //  private stuff would go here
  //  shared by all instances
  const validatePosition = (position) => {
    if (Array.isArray(position)) {
      return position;
    } else {
      throw new Error("Position must be an array");
    }
  }
  const render = () => {};
  
  return function(position) {
    // per-instance private vars here
    
    
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
  const render = () => {
    return "@";
  }
  return function(position) {
    var gameObject = new GameObject(position);
    
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
})();
