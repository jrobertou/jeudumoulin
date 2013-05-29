function Player(name) {
  this.name = name;

  this.pieces = [];
  for (var i = 0; i < 9; i++) {
    this.pieces[i] = new Piece(this);
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

    if (piece.state === state)
      pieces_to_play.push(piece);
  }
  return pieces_to_play;
};

Player.prototype.can_move = function() {
  if (this.pieces_on_board().length <= 3)
    return true;

  var can_move = true;

  var pieces_on_board = this.pieces_on_board();
  for (var i = 0; i < pieces_on_board.length; i++) {
    if (pieces_on_board[i].can_move() === false)
    {
      can_move = false;
      break;
    }
  }

  return can_move;
};