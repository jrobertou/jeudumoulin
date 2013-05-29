function AI(game, player) {
  this.game = game;
  this.player = player;
  this.init_player_listeners();
}

AI.prototype.init_player_listeners = function() {
  var ai = this;
  this.player.on_beginning_of_turn = function() {
    ai.on_beginning_of_turn();
  };
  this.player.on_beginning_of_capture = function() {
    ai.on_beginning_of_capture();
  };
};

AI.prototype.on_beginning_of_turn = function() {
  this.place_random_piece();
};

AI.prototype.on_beginning_of_capture = function() {
  this.capture_random_opponent_piece();
};

AI.prototype.place_random_piece = function() {
  var ai = this;
  console.log(this);

  var randomPlace = function() {
    return ai.game.board.places[Math.floor(Math.random()*24)];
  };

  var place = null;
  while((place = randomPlace()).is_occupied()) {}

  this.player.place_piece_on_board(place);
};

AI.prototype.capture_random_opponent_piece = function() {
  var ai = this;

  var randomPiece = function() {
    var otherPlayerPieces = ai.game.other_player(ai.player).pieces_on_board();
    return otherPlayerPieces[Math.floor(Math.random()*(otherPlayerPieces.length))];
  };

  var piece = null;
  while(!(piece = randomPiece()).can_be_captured()) {}

  console.log(ai.game.board.places.indexOf(piece.place));
  this.player.capture_piece(piece);
};
