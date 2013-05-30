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
  var ai = this;
  setTimeout(function() {
    switch(ai.game.state)
      {
        case GameState.FIRST_STAGE:
          ai.place_random_piece();
          break;
        case GameState.SECOND_STAGE:
          ai.move_random_piece();
          break;
      }
  }, 500);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_random_opponent_piece();
  }, 200);
};

AI.prototype.place_random_piece = function() {
  var ai = this;

  var random_place = function() {
    return ai.game.board.places[Math.floor(Math.random()*24)];
  };

  var place = null;
  while((place = random_place()).is_occupied()) {}

  this.player.place_piece_on_board(place);
};

AI.prototype.capture_random_opponent_piece = function() {
  var ai = this;

  var random_piece = function() {
    var otherPlayerPieces = ai.game.other_player(ai.player).pieces_on_board();
    return otherPlayerPieces[Math.floor(Math.random()*(otherPlayerPieces.length))];
  };

  var piece = null;
  while(!(piece = random_piece()).can_be_captured()) {}

  this.player.capture_piece(piece);
};

AI.prototype.move_random_piece = function() {
  var ai = this;

  var random_piece = function() {
    var player_pieces = ai.player.pieces_on_board();
    return player_pieces[Math.floor(Math.random()*(player_pieces.length))];
  };

  var piece = null;
  while(!(piece = random_piece()).can_move()) {}

  var random_adjacent_place = function() {
    var adjacent_places = piece.place.adjacent_places;
    return adjacent_places[Math.floor(Math.random()*(adjacent_places.length))];
  };

  var place = null;
  while(!(place = random_adjacent_place()).is_empty()) {}

  this.player.move_piece(piece, place);
};
