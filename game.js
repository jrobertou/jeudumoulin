function Game() {
  this.players = [new Player("Alice"), new Player("Bob")];
  this.board = new Board();
  this.current_player = this.players[0];
}

Game.prototype.switch_current_player = function() {
  var current_player_index = this.players.indexOf(this.current_player);

  if (current_player_index === 0)
  {
    this.current_player = this.players[1];
  }
  else
  {
    this.current_player = this.players[0];
  }

  return this.current_player;
};
