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
  }, 100);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_random_piece();
  }, 100);
};

AI.prototype.place_random_piece = function() {
  var places = this.game.board.places;
  var random_place = function() {
    return places[Math.floor(Math.random()*places.length)];
  };

  var place = null;
  while((place = random_place()).is_occupied()) {}

  this.player.place_piece_on_board(place);
};

AI.prototype.capture_random_piece = function() {
  var opponent_pieces = this.game.other_player(this.player).pieces_on_board();
  var random_piece = function() {
    return opponent_pieces[Math.floor(Math.random()*(opponent_pieces.length))];
  };

  var piece = null;
  while(!(piece = random_piece()).can_be_captured()) {}

  this.player.capture_piece(piece);
};

AI.prototype.move_random_piece = function() {
  var player_pieces = this.player.pieces_on_board();
  var random_piece = function() {
    return player_pieces[Math.floor(Math.random()*(player_pieces.length))];
  };

  var piece = null;
  while(!(piece = random_piece()).can_move()) {}

  var places = null;
  if (this.player.pieces_on_board().length <= 3) {
    places = this.game.board.places;
  } else {
    places = piece.place.adjacent_places;
  }
  var random_place = function() {
    return places[Math.floor(Math.random()*(places.length))];
  };

  var place = null;
  while(!(place = random_place()).is_empty()) {}

  this.player.move_piece(piece, place);
};
