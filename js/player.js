function Player(game, name, color) {
  this.game = game;
  this.name = name;
  this.color = color;

  this.pieces = [];
  for (var i = 0; i < 9; i++) {
    this.pieces[i] = new Piece(this.game, this);
  }
}

Player.prototype.pieces_to_play = function() {
  return this.pieces_filtered_by_state(PieceState.TO_PLAY);
};

Player.prototype.pieces_on_board = function() {
  return this.pieces_filtered_by_state(PieceState.ON_BOARD);
};

Player.prototype.captured_pieces = function() {
  return this.pieces_filtered_by_state(PieceState.CAPTURED);
};

Player.prototype.pieces_filtered_by_state = function(state) {
  var pieces_to_play = [];
  var piece = null;
  for (var i = 0; i < this.pieces.length; i++) {
    piece = this.pieces[i];

    if (piece.state === state) {
      pieces_to_play.push(piece);
    }
  }
  return pieces_to_play;
};

Player.prototype.can_move = function() {
  if (this.pieces_on_board().length <= 3)
    return true;

  var can_move = true;

  var pieces_on_board = this.pieces_on_board();
  for (var i = 0; i < pieces_on_board.length; i++) {
    if (pieces_on_board[i].can_move() === false) {
      can_move = false;
      break;
    }
  }

  return can_move;
};

Player.prototype.on_mill_formed = function() {
  this.game.on_mill_formed();
};

Player.prototype.end_turn = function() {
  this.game.end_turn();
};

Player.prototype.place_piece_on_board = function(place) { // first stage
  var piece = this.pieces_to_play()[0];

  if (piece.can_be_placed_on(place)) {
    piece.place_on_board(place);
    this.end_turn();
  }
};

Player.prototype.move_piece = function(piece, place) { // second stage
  piece.move(place);

  if(piece.forms_mill()) {
    this.on_mill_formed();
  } else {
    this.end_turn();
  }
};

Player.prototype.capture_piece = function(piece) {
  piece.capture();
  this.end_turn();
};
