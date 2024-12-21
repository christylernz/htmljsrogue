import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';


export var Game = (function() {
  let staticView, staticSystem;
  
  return function(view, system) {
    staticView = view;
    staticSystem = system;
    staticSystem.loadMap();
    staticView.updateMap(staticSystem.map);
    return {
      view: staticView,
      system: staticSystem
    };
  }
})();

