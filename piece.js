var PieceState = {
  TO_PLAY: 0,
  ON_BOARD: 1,
  CAPTURED: 2
};

function Piece(player) {
  this.player = player;
  this.state = PieceState.TO_PLAY;
  this.place = null;
}

Piece.prototype.move = function(place) {
  this.place = place;
};

Piece.prototype.can_move = function() {
  var can_move = true;

  var adjacent_places = this.place.adjacent_places;
  for (var i = 0; i < adjacent_places.length; i++) {
    if (adjacent_places[i].is_occupied())
    {
      can_move = false;
      break;
    }
  }

  return can_move;
};
