function Place(game) {
  this.game = game;
  this.piece = null;
  this.adjacent_places = null;
  this.mill_places = null;
}

Place.prototype.is_occupied = function() {
  return this.piece !== null;
};

Place.prototype.is_empty = function() {
  return this.piece === null;
};

Place.prototype.is_adjacent_to = function(place) {
  return this.adjacent_places.indexOf(place) != -1;
};

Place.prototype.empty_adjacent_places = function() {
  var empty_adjacent_places = [];

  this.adjacent_places.forEach(function(place) {
    if(place.is_empty()) {
      empty_adjacent_places.push(place);
    }
  });

  return empty_adjacent_places;
}
