var GameState = {
  NOT_STARTED: 0,
  FIRST_STAGE: 1,
  SECOND_STAGE: 2,
  ENDED: 3
};

function Game() {
  this.on_game_init = function(){};
  this.on_beginning_of_turn = function(){};
  this.on_end_of_turn = function(){};
  this.on_end_of_game = function(){};
  this.on_mill_formed = function(){};
}

Game.prototype.init = function() {
  this.players = [new Player(this, "Alice", "green"), new Player(this, "Bob", "red")];
  this.board = new Board(this);
  this.current_player = this.players[0];
  this.state = GameState.NOT_STARTED;
  this.winner = null;
  this.on_game_init();
};

Game.prototype.reset = function() {
  this.init();
};

Game.prototype.start = function() {
  this.state = GameState.FIRST_STAGE;
  this.begin_turn();
};

Game.prototype.other_player = function(player) {
  var other_player = null;

  var player_index = this.players.indexOf(player);

  if (player_index === 0) {
    other_player = this.players[1];
  } else {
    other_player = this.players[0];
  }

  return other_player;
};

Game.prototype.switch_current_player = function() {
  this.current_player = this.other_player(this.current_player);
};

Game.prototype.begin_turn = function() {
  this.current_player.begin_turn();
  this.on_beginning_of_turn();
};

Game.prototype.end_turn = function() {
  // Check start of second stage
  if (this.state === GameState.FIRST_STAGE &&
      this.players[0].pieces_to_play().length === 0 &&
      this.players[1].pieces_to_play().length === 0)
  {
    this.state = GameState.SECOND_STAGE;
  }

  this.on_end_of_turn();

  this.switch_current_player();

  this.begin_turn();

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
