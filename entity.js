export function Player(position, display) {
  
  // Verify required methods exist
  const descriptor = Object.getOwnPropertyDescriptor(position, 'position');
  if (!descriptor || !descriptor.get || !descriptor.set) {
    throw new Error('Position must implement get and set methods');
  }
  if (typeof display.render !== 'function') {
    throw new Error("Display must have render method");
  }
  const player = {};
  
  Object.defineProperties(player, {
    ...Object.getOwnPropertyDescriptors(position),
    ...Object.getOwnPropertyDescriptors(display)
  });

  return player;
}