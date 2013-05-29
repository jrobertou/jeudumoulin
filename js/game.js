var GameState = {
  FIRST_STAGE: 0,
  SECOND_STAGE: 1,
  ENDED: 2
};

function Game() {
  this.players = [new Player(this, "Alice", "green"), new Player(this, "Bob", "red")];
  this.board = new Board(this);
  this.current_player = this.players[0];
  this.state = GameState.FIRST_STAGE;
  this.winner = null;
  this.on_end_of_turn = function(){};
  this.on_end_of_game = function(){};
  this.on_mill_formed = function(){};
}

Game.prototype.other_player = function(player) {
  var player_index = this.players.indexOf(player);

  if (player_index === 0) {
    return this.players[1];
  } else {
    return this.players[0];
  }
};

Game.prototype.switch_current_player = function() {
  this.current_player = this.other_player(this.current_player);
};

Game.prototype.check_win = function() { // to do when players are switched
  if (this.state === GameState.FIRST_STAGE) {
    return null;
  }

  var winner = null;

  var current_player = this.current_player;
  var other_player = this.other_player(current_player);

  // current player has 2 pieces left or can't move
  if(current_player.pieces_on_board().length <= 2 || !current_player.can_move()) {
    winner = other_player;
  }

  return winner;
};

Game.prototype.check_draw = function() {
  if (this.state === GameState.FIRST_STAGE) {
    return false;
  }

  return false;
};

Game.prototype.end_turn = function() {
  // Check start of second stage
  if (this.state === GameState.FIRST_STAGE &&
      this.players[0].pieces_to_play().length === 0 &&
      this.players[1].pieces_to_play().length === 0)
  {
    this.state = GameState.SECOND_STAGE;
  }

  // Switch player and trigger end of turn callback
  this.switch_current_player();
  this.on_end_of_turn();

  // Check win or draw to potentially end the game
  var winner = this.check_win();
  if(winner !== null) {
    this.winner = winner;
    this.end_game();
  }
  else if (this.check_draw() === true) {
    this.end_game();
  }
};

Game.prototype.end_game = function() {
  this.state = GameState.ENDED;
  this.on_end_of_game();
};
