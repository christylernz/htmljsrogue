export function Name(name) {
  let myName;

  const validateName = (name) => {
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

export function DisplayChar(symbol) {
  let mySymbol = symbol;
  return {
    render: () => { return mySymbol; }
  }
}

export function Position(position) {
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

export function MovePosition() {
  return {
    move: (direction, startPosition) => {
      switch (direction) {
        case Direction.UP:
          return [startPosition[0], startPosition[1] - 1];
          break;
        case Direction.DOWN:
          return [startPosition[0], startPosition[1] + 1];
          break;
        case Direction.LEFT:
          return [startPosition[0] - 1, startPosition[1]];
          break;
        case Direction.RIGHT:
          return [startPosition[0] + 1, startPosition[1]];
          break;
        
        default:
          throw new Error("Invalid direction");
      }
    }
  }
}

export const Direction = {
  UP: 'UP', 
  DOWN: 'DOWN', 
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}