function AI(game, player) {
  this.game = game;
  this.player = player;
  this.init_player_listeners();
  this.wait_time = 50;
  this.get_piece_placement = function() {};
  this.get_piece_movement = function() {};
  this.get_piece_capture = function() {};
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
        ai.place_piece();
        break;
      case GameState.SECOND_STAGE:
        ai.move_piece();
        break;
    }
  }, ai.wait_time);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_piece();
  }, ai.wait_time);
};

AI.prototype.place_piece = function() {
  var place = this.get_piece_placement();

  this.player.place_piece_on_board(place);
};

AI.prototype.move_piece = function() {
  var piece_movement = this.get_piece_movement();

  this.player.move_piece(piece_movement.piece, piece_movement.place);
};

AI.prototype.capture_piece = function() {
  var piece = this.get_piece_capture();

  this.player.capture_piece(piece);
};
