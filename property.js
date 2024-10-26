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