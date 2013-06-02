if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Proximity = function() {
  this.ai = null;
  AIBehaviors.Base.extend(AIBehaviors.Proximity);
};

AIBehaviors.Proximity.prototype.get_piece_placement = function() {
  var places = this.ai.game.board.empty_places();

  return this.best_places(places).random_element();
};

AIBehaviors.Proximity.prototype.get_piece_movement = function() {
  var pieces = this.ai.player.pieces_on_board();

  var behavior = this;
  var places = null;
  var place = null;
  return  _.chain(pieces)
          .map(function(piece) {
            places = piece.places_movable_to();
            if (places.length > 0) {
              place = behavior.best_places(places).random_element();

              return {piece: piece, place: place};
            }
          })
          .compact()
          .groupBy(function(movement) {
            return movement.place.occupied_adjacent_places_count();
          })
          .pairs()
          .sortBy(function(pair) {
            return pair[0];
          })
          .last()
          .last()
          .value()
          .random_element();
};

AIBehaviors.Proximity.prototype.get_piece_capture = function() {
  var opponent_pieces = this.ai.game.other_player(this.ai.player).pieces_on_board();

  var piece = null;
  while(!(piece = opponent_pieces.random_element()).can_be_captured()) {}

  return piece;
};

AIBehaviors.Proximity.prototype.best_places = function(places) {
  return _.chain(places)
          .groupBy(function(place) {
            return place.occupied_adjacent_places_count();
          })
          .pairs()
          .sortBy(function(pair) {
            return pair[0];
          })
          .last()
          .last()
          .value();
};
