export const GameObject = (position) => {
  var position = position;
  const render = () => {}
  return {
    position, 
    render
  }
}

export const SimpleObject = (position) => {
  var position = position;
  const render = () => {
    return "@";
  }
  return {
    position, 
    render
  }
}
