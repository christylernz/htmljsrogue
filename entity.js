export function Player(position, display, movePosition) {

  // Verify required methods exist
  const descriptor = Object.getOwnPropertyDescriptor(position, 'position');
  if (!descriptor || !descriptor.get || !descriptor.set) {
    throw new Error("Position must implement getter and setter");
  }
  if (typeof display.render !== 'function') {
    throw new Error("Display must implement render method");
  }
  
  if (typeof movePosition.move !== 'function') {
    throw new Error("MovePosition must implement move method");
  }
  const player = {};

  Object.defineProperties(player, {
    ...Object.getOwnPropertyDescriptors(position),
    ...Object.getOwnPropertyDescriptors(display), 
  });

  player.move = function(direction) {
    this.position = movePosition.move(direction, this.position);
  }

  return player;
}