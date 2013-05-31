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
  return _.select(this.adjacent_places, function(place) {
    return place.is_empty();
  });
};

Place.prototype.empty_adjacent_places_count = function() {
  return _.reduce(this.adjacent_places, function(count, place) {
    if (place.is_empty()) {
      count++;
    }
    return count;
  }, 0);
};

Place.prototype.occupied_adjacent_places = function() {
  return _.select(this.adjacent_places, function(place) {
    return place.is_occupied();
  });
};

Place.prototype.occupied_adjacent_places_count = function() {
  return _.reduce(this.adjacent_places, function(count, place) {
    if (place.is_occupied()) {
      count++;
    }
    return count;
  }, 0);
};
