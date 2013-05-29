var PlayerState = {
  WAITING: 0,
  HAS_TO_PLAY: 1,
  HAS_TO_CAPTURE: 2
};

function Player(game, name, color) {
  this.game = game;
  this.name = name;
  this.color = color;

  this.state = PlayerState.WAITING;

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
  var filtered_pieces = [];
  var piece = null;
  for (var i = 0; i < this.pieces.length; i++) {
    piece = this.pieces[i];

    if (piece.state === state) {
      filtered_pieces.push(piece);
    }
  }
  return filtered_pieces;
};

Player.prototype.can_move = function() {
  if (this.pieces_on_board().length <= 3)
    return true;

  var can_move = false;

  var pieces_on_board = this.pieces_on_board();
  for (var i = 0; i < pieces_on_board.length; i++) {
    if (pieces_on_board[i].can_move() === true) {
      can_move = true;
      break;
    }
  }

  return can_move;
};

Player.prototype.begin_turn = function() {
  this.state = PlayerState.HAS_TO_PLAY;
};

Player.prototype.on_mill_formed = function() {
  this.state = PlayerState.HAS_TO_CAPTURE;
  this.game.on_mill_formed();
};

Player.prototype.end_turn = function() {
  this.state = PlayerState.WAITING;
  this.game.end_turn();
};

Player.prototype.place_piece_on_board = function(place) { // first stage
  if (this.game.state !== GameState.FIRST_STAGE || this.state !== PlayerState.HAS_TO_PLAY) {
    return false;
  }

  var piece = this.pieces_to_play()[0];

  if (piece && piece.can_be_placed_on(place)) {
    piece.place_on_board(place);

    if(piece.forms_mill()) {
      this.on_mill_formed();
    } else {
      this.end_turn();
    }
  }
};

Player.prototype.move_piece = function(piece, place) { // second stage
  if (this.game.state !== GameState.SECOND_STAGE || this.state !== PlayerState.HAS_TO_PLAY) {
    return false;
  }

  if (piece && piece.can_move_to(place)) {
    piece.move(place);

    if(piece.forms_mill()) {
      this.on_mill_formed();
    } else {
      this.end_turn();
    }
  }
};

Player.prototype.capture_piece = function(piece) {
  if ((this.game.state !== GameState.FIRST_STAGE && this.game.state !== GameState.SECOND_STAGE) ||
    this.state !== PlayerState.HAS_TO_CAPTURE) {
    return false;
  }
  if (piece && piece.can_be_captured()) {
    piece.capture();
    this.end_turn();
  }
};
