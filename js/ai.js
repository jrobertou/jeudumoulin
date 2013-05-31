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
        ai.best_move();
        //ai.move_random_piece();
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
  this.player.place_piece_on_board(this.get_place_with_max_adj_occupied(this.game.board.empty_places()).place);
};

AI.prototype.best_move = function() {

  var short_by_rank = this.best_move_sort_by_rank();

  this.player.move_piece(short_by_rank.piece, short_by_rank.place);
};

//return random place/piece in max rank
AI.prototype.best_move_sort_by_rank = function() {
  var ai = this,
    possible_pieces = this.player.pieces_on_board(),
    candidats = [],
    place_rank_foo = null,
    possible_places = null;

  possible_pieces.forEach(function(piece){
    
    possible_places = piece.array_where_can_move();

      if(possible_places.length){
        place_rank_foo = ai.get_place_with_max_adj_occupied(possible_places);
        candidats.push({piece: piece, place: place_rank_foo.place, rank: place_rank_foo.rank});
      }
  });

  return candidats.max_rank_pieces_array().random_element();
};

//return PLACE and RANK (nb adjacent) with the max number of adjacent occupied
AI.prototype.get_place_with_max_adj_occupied = function(tab_of_place) {
  var possible_places = tab_of_place,
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
  var rank = tab_with_rank.length-1;

  return {place: tab_with_rank[rank].random_element(), rank:rank};
};
