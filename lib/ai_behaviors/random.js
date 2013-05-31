if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Random = function(ai) {
  AIBehaviors.Base.extend(AIBehaviors.Random);
  this.ai = null;
};

AIBehaviors.Random.prototype.get_piece_placement = function() {
  var places = this.ai.game.board.places;

  var place = null;
  while((place = places.random_element()).is_occupied()) {}

  return place;
};

AIBehaviors.Random.prototype.get_piece_movement = function() {
  var player_pieces = this.ai.player.pieces_on_board();

  var piece = null;
  while(!(piece = player_pieces.random_element()).can_move()) {}

  var place = piece.places_movable_to().random_element();

  return {piece: piece, place: place};
};

AIBehaviors.Random.prototype.get_piece_capture = function() {
  var opponent_pieces = this.ai.game.other_player(this.ai.player).pieces_on_board();

  var piece = null;
  while(!(piece = opponent_pieces.random_element()).can_be_captured()) {}

  return piece;
};
