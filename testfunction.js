export function GameObject(position) {
  this.position = position;
  this.render = function () {}
}

export function SimpleObject(position) {
  this.position = position;
  this.render = function () {
    return "@";
  }
}