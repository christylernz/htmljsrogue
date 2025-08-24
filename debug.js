export var Debug = (function() {
  const debugDiv = document.getElementById("debug");
  let myState;
  let enabled = window.location.hostname === "localhost";
  const init = function (state) {
    if (!state) {
      debugDiv.style.display = "none";
      enabled = false;
      console.error("missing state, debug disabled")
      return;
    }
    myState = state;
    debugDiv.style.display = "block";
    debugDiv.innerHTML = "Debug Enabled";
  }
  const update = function() {
    if (enabled) {
debugDiv.innerHTML = `
      <pre>${JSON.stringify(myState, null, 2)}</pre>
    `;
      
    }
  }
  return function() {
    return {
      init,
      update,
    };
  }
})();