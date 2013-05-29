function IA(game, player) {
  this.game = game;
  this.player = player;
}

IA.prototype.place_random_piece = function() {
  var ia = this;

  var randomPlace = function() {
    return ia.game.board.places[Math.floor(Math.random()*24)];
  }
  
  var place = null;
  while((place = randomPlace()).is_occupied()) {}

  this.player.place_piece_on_board(place);
};