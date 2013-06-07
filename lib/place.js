function Place(game, id) {
  this.game = game;
  this.id = id;
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

Place.prototype.can_lock_mills = function () {
  return this.how_many_forms_mill(this.game.other_player(this.game.current_player));
}

Place.prototype.how_many_forms_mill = function(player) {
  player = player?player:this.game.current_player;
  var mill_places = this.mill_places,
    number_forms_mill = 0,
    line = null,
    place = null,
    line_complete = null;

  for (var i = 0; i < mill_places.length; i++) {
    line = mill_places[i];
    line_complete = true;
    for (var j = 0; j < line.length; j++) {
      place = line[j];
      line_complete = (line_complete && place.is_occupied() && place.piece.player == player);
    }
    if (line_complete) {
      number_forms_mill++;
      break;
    }
  }
  return number_forms_mill;
};
