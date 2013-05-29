function Place() {
  this.piece = null;
  this.adjacent_places = null;
}

Place.prototype.is_occupied = function() {
  return this.piece !== null;
};
