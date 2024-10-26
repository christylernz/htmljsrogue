export function Player(position, display) {
  const player = {};

  Object.defineProperties(player, {
    ...Object.getOwnPropertyDescriptors(position),
    ...Object.getOwnPropertyDescriptors(display)
  });

  return player;
}