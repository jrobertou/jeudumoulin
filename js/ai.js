function AI(game, player) {
  this.game = game;
  this.player = player;
  this.init_player_listeners();
  this.wait_time = 500;
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
  }, this.wait_time);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_random_piece();
  }, this.wait_time);
};

AI.prototype.place_random_piece = function() {
  var places = this.game.board.places;

  var place = null;
  while((place = places.random_element()).is_occupied()) {}

  this.player.place_piece_on_board(place);
};

AI.prototype.capture_random_piece = function() {
  var opponent_pieces = this.game.other_player(this.player).pieces_on_board();

  var piece = null;
  while(!(piece = opponent_pieces.random_element()).can_be_captured()) {}

  this.player.capture_piece(piece);
};

AI.prototype.move_random_piece = function() {
  var player_pieces = this.player.pieces_on_board();

  var piece = null;
  while(!(piece = player_pieces.random_element()).can_move()) {}

  var place = piece.places_movable_to().random_element();

  this.player.move_piece(piece, place);
};

/* TODO

AI.prototype.top_posibilities = function() {
  var empty_places = this.game.board.empty_places(),
    possible_places = this.possible_places();

};

AI.prototype.possible_places = function() {
  for( var i=0, imax=this.player.pieces_on_board().length; i<imax; ++i) {

  }
};

*/
