export var Game = (function() {
  let staticView, staticSystem;
  
  return function(view, system) {
    staticView = view;
    staticSystem = system;
    staticSystem.loadMap();
    staticSystem.loadMap().then(() => {
      staticView.renderMap(staticSystem.visibleMap());
      staticView.renderInventory(staticSystem.inventory);
      staticView.addListeners(staticSystem.movePlayer);
    });

    return {
      view: staticView,
      system: staticSystem
    };
  }
})();