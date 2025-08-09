export var Game = (function() {
  let staticView, staticSystem;
  
  const movePlayer = function(direction) {
    staticSystem.movePlayer(direction);
    staticView.renderMap(staticSystem.visibleMap());
    staticView.renderInventory(staticSystem.inventory);
  };

  const loadGame = async function() {
    try {
      await staticSystem.loadMap();
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