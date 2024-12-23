export var Game = (function() {
  let staticView, staticSystem;
  
  return function(view, system) {
    staticView = view;
    staticSystem = system;
    staticSystem.loadMap();
    staticView.renderMap(staticSystem.map);
    staticView.renderInventory();
    return {
      view: staticView,
      system: staticSystem
    };
  }
})();