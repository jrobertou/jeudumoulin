function AI(game, player) {
  this.game = game;
  this.player = player;
  this.init_player_listeners();
  this.wait_time = 50;
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

//
// CALLBACKS Part //
//

AI.prototype.on_beginning_of_turn = function() {
  var ai = this;
  setTimeout(function() {
    switch(ai.game.state)
    {
      case GameState.FIRST_STAGE:
        ai.best_placement();
        //ai.place_random_piece();
        break;
      case GameState.SECOND_STAGE:
        //ai.best_move();
        ai.move_random_piece();
        break;
    }
  }, ai.wait_time);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_random_piece();
  }, this.wait_time);
};


//
// RANDOM Part //
//

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


//
// TRUE AI Part //
//
AI.prototype.best_placement = function() {
  this.player.place_piece_on_board(this.get_place_with_max_adj_occupied());
};

AI.prototype.best_move = function() {
  var ai = this;
  var best_piece = ai.get_piece_with_less_adj_occupied(),
    best_place = ai.get_place_with_max_adj_occupied();

  this.player.move_piece(best_piece, best_place);
};

//return PIÈCE with the min number of adjacent free
AI.prototype.get_piece_with_less_adj_occupied = function() {
  var possible_pieces = this.player.pieces_on_board(),
    candidat,
    nbAdjCandidat;

  var piece_with_less_adj_free = {piece: possible_pieces[0], nbAdjacent: possible_pieces[0].calculate_nb_adjacent_free()};

  for( var i=1, imax=possible_pieces.length; i<imax; ++i) {

    candidat = possible_pieces[i];
    nbAdjCandidat = possible_pieces[i].calculate_nb_adjacent_free_to();

    if(piece_with_less_adj_free.nbAdjacent > nbAdjCandidat)
      piece_with_less_adj_free = {piece: candidat, nbAdjacent: nbAdjCandidat};
  }
  return piece_with_less_adj_free.piece;
};

//return PLACE with the max number of adjacent occupied
AI.prototype.get_place_with_max_adj_occupied = function() {
  var possible_places = this.game.board.empty_places(),
    tab_with_rank = [],
    candidat,
    nbAdjCandidat;

  for( var i=0, imax=possible_places.length; i<imax; ++i) {

    candidat = possible_places[i];
    nbAdjCandidat = candidat.calculate_nb_adjacent_occupied();

    if(!tab_with_rank[nbAdjCandidat]){
      tab_with_rank[nbAdjCandidat] = [];
    }

    tab_with_rank[nbAdjCandidat].push(candidat);
  }
  var length = tab_with_rank.length-1;

  return tab_with_rank[length].random_element();
};
