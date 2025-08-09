export var Game = (function() {
  let staticView, staticSystem;
  
  const movePlayer = function(direction) {
    staticSystem.movePlayer(direction);
    staticView.renderMap(staticSystem.visibleMap());
    staticView.renderInventory(staticSystem.inventory);
  };

  return function(view, system) {
    staticView = view;
    staticSystem = system;
    staticSystem.loadMap();
    staticView.renderMap(staticSystem.visibleMap);
    staticView.renderInventory(staticSystem.inventory);

    return {
      view: staticView,
      system: staticSystem
    };
  }
})();