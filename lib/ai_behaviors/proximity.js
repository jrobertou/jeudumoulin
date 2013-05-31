if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Proximity = function() {
  AIBehaviors.Base.extend(AIBehaviors.Proximity);
  this.ai = null;
};

AIBehaviors.Proximity.prototype.get_piece_placement = function() {
  var place = this.get_place_with_max_adj_occupied(this.ai.game.board.empty_places()).place;

  return place;
};

AIBehaviors.Proximity.prototype.get_piece_movement = function() {
  var behavior = this,
    possible_pieces = this.ai.player.pieces_on_board(),
    candidats = [],
    place_rank_foo = null,
    possible_places = null;

  possible_pieces.forEach(function(piece){

    possible_places = piece.places_movable_to();

      if(possible_places.length){
        place_rank_foo = behavior.get_place_with_max_adj_occupied(possible_places);
        candidats.push({piece: piece, place: place_rank_foo.place, rank: place_rank_foo.rank});
      }
  });

  return candidats.max_rank_pieces_array().random_element();
};

AIBehaviors.Proximity.prototype.get_piece_capture = function() {
  var opponent_pieces = this.ai.game.other_player(this.ai.player).pieces_on_board();

  var piece = null;
  while(!(piece = opponent_pieces.random_element()).can_be_captured()) {}

  return piece;
};

//return PLACE and RANK (nb adjacent) with the max number of adjacent occupied
AIBehaviors.Proximity.prototype.get_place_with_max_adj_occupied = function(tab_of_place) {
  var possible_places = tab_of_place,
    tab_with_rank = [],
    candidat,
    nbAdjCandidat;

  for( var i=0, imax=possible_places.length; i<imax; ++i) {

    candidat = possible_places[i];
    nbAdjCandidat = candidat.occupied_adjacent_places_count();

    if(!tab_with_rank[nbAdjCandidat]){
      tab_with_rank[nbAdjCandidat] = [];
    }

    tab_with_rank[nbAdjCandidat].push(candidat);
  }
  var rank = tab_with_rank.length-1;

  return {place: tab_with_rank[rank].random_element(), rank:rank};
};
