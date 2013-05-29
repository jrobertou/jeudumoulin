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
};

AI.prototype.on_beginning_of_turn = function() {
  this.place_random_piece();
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
