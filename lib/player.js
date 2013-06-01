var PlayerState = {
  WAITING: 0,
  HAS_TO_PLAY: 1,
  HAS_TO_CAPTURE: 2
};

function Player(game, id, name, color) {
  this.game = game;
  this.id = id;
  this.name = name;
  this.color = color;
  this.ia = false;

  this.state = PlayerState.WAITING;

  this.pieces = [];
  for (var i = 0; i < 9; i++) {
    this.pieces[i] = new Piece(this.game, this);
  }

  this.on_beginning_of_turn = function() {};
  this.on_beginning_of_capture = function() {};
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
  this.pieces.forEach(function(piece) {
    if (piece.state === state) {
      filtered_pieces.push(piece);
    }
  });
  return filtered_pieces;
};

Player.prototype.can_move = function() {
  if (this.can_jump()) {
    return true;
  }

  return _.any(this.pieces_on_board(), function(piece) {
    return piece.can_move();
  });
};

Player.prototype.can_jump = function() {
  return this.pieces_on_board().length <= 3;
};

Player.prototype.begin_turn = function() {
  this.state = PlayerState.HAS_TO_PLAY;
  this.on_beginning_of_turn();
};

Player.prototype.on_mill_formed = function() {
  this.state = PlayerState.HAS_TO_CAPTURE;
  this.game.on_mill_formed();
  this.on_beginning_of_capture();
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

  if (piece && piece.player === this && piece.can_move_to(place)) {
    piece.move(place);

    if(piece.forms_mill()) {
      this.on_mill_formed();
    } else {
      this.game.no_capture_count++;
      this.end_turn();
    }
  }
};

Player.prototype.capture_piece = function(piece) {
  if ((this.game.state !== GameState.FIRST_STAGE && this.game.state !== GameState.SECOND_STAGE) ||
    this.state !== PlayerState.HAS_TO_CAPTURE) {
    return false;
  }
  if (piece && piece.player !== this && piece.can_be_captured()) {
    piece.capture();
    this.game.no_capture_count = 0;
    this.end_turn();
  }
};
