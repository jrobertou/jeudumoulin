var PieceState = {
  TO_PLAY: 0,
  ON_BOARD: 1,
  CAPTURED: 2
};

function Piece(game, player) {
  this.game = game;
  this.player = player;
  this.state = PieceState.TO_PLAY;
  this.place = null;
}

Piece.prototype.place_on_board = function(place) {
  if (this.can_be_placed_on(place)) {
    this.place = place;
    place.piece = this;
    this.state = PieceState.ON_BOARD;
  }
};

Piece.prototype.move = function(place) {
  if (this.can_move_to(place)) {
    this.place.piece = null;
    this.place = place;
    place.piece = this;
  }
};

Piece.prototype.capture = function() {
  if (this.can_be_captured()) {
    this.place.piece = null;
    this.place = null;
    this.state = PieceState.CAPTURED;
  }
};

Piece.prototype.can_be_placed_on = function(place) {
  return place.is_empty();
};

Piece.prototype.can_move = function() {
  if (this.player.can_jump()) {
    return true;
  }

  var can_move = false;

  var adjacent_places = this.place.adjacent_places;
  for (var i = 0; i < adjacent_places.length; i++) {
    if (adjacent_places[i].is_empty()) {
      can_move = true;
      break;
    }
  }

  return can_move;
};

Piece.prototype.can_move_to = function(place) {
  return place.is_empty() && (this.player.can_jump() || this.place.is_adjacent_to(place));
};

Piece.prototype.can_be_captured = function() {
  return !this.forms_mill();
};

Piece.prototype.forms_mill = function() {
  var forms_mill = false;

  var mill_places = this.place.mill_places;
  var line = null;
  var place = null;
  var line_complete = null;

  for (var i = 0; i < mill_places.length; i++) {
    line = mill_places[i];
    line_complete = true;
    for (var j = 0; j < line.length; j++) {
      place = line[j];
      line_complete = (line_complete && place.is_occupied() && place.piece.player == this.player);
    }
    if (line_complete) {
      forms_mill = true;
      break;
    }
  }

  return forms_mill;
};

Piece.prototype.places_movable_to = function() {
  var places_free = [];

  if (this.player.can_jump()){
    return this.game.board.empty_places();
  }
  else{

    var places = this.place.adjacent_places;

    for (var i=0, imax=places.length; i<imax; i++) {
      if(places[i].is_empty())
        places_free.push(places[i]);
    }
    return places_free;
  }
};
