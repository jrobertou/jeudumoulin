var GameState = {
  FIRST_STAGE: 0,
  SECOND_STAGE: 1
};

function Game() {
  this.players = [new Player("Alice"), new Player("Bob")];
  this.board = new Board();
  this.current_player = this.players[0];
  this.state = GameState.FIRST_STAGE;
}

Game.prototype.other_player = function(player) {
  var player_index = this.players.indexOf(player);

  if (player_index === 0)
    return this.players[1];
  else
    return this.players[0];
};

Game.prototype.switch_current_player = function() {
  this.current_player = this.other_player(this.current_player);

  return this.current_player;
};

Game.prototype.check_win = function() {
  if (this.state == GameState.FIRST_STATE)
    return null;

  var winner = null;

  var player = null;
  for (var i = 0; i < this.players.length; i++) {
    player = this.players[i];

    if(player.captured_pieces >= 7 || !player.can_move()) {
      winner = player;
      break;
    }
  }

  return winner;
};

Game.prototype.check_draw = function() {
  if (this.state == GameState.FIRST_STATE)
    return false;

  return false;
};
