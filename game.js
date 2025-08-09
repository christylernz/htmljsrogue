export var Game = (function() {
  let staticView, staticSystem;
  
  const movePlayer = function(direction) {
    staticSystem.handlePlayerInput(direction);
    staticView.renderMap(staticSystem.visibleMap);
    staticView.renderInventory(staticSystem.inventory);
  };

  const loadGame = async function() {
    try {
      await staticSystem.loadMap();
      staticView.addListeners(movePlayer)
      staticView.renderMap(staticSystem.visibleMap);
      staticView.renderInventory(staticSystem.inventory);
    } catch (error) {
      console.error('Error loading game:', error);
    }
  }

  return function(view, system) {
    staticView = view;
    staticSystem = system;
    loadGame();

    return {
      view: staticView,
      system: staticSystem

    };
  }
})();