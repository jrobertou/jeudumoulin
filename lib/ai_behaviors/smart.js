if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Smart = function() {
  this.ai = null;
  AIBehaviors.Base.extend(AIBehaviors.Smart);
};

AIBehaviors.Smart.prototype.get_placement_value = function(place) {
  var piece = this.ai.player.pieces_to_play()[0];
  return value = place.occupied_adjacent_places_count() +
  		place.can_block_mills()*2 +
      place.how_many_forms_mill()*4;
};

AIBehaviors.Smart.prototype.get_movement_value = function(movement) {
  return movement.place.occupied_adjacent_places_count() -
        movement.piece.place.occupied_adjacent_places_count() +
  		movement.place.can_block_mills()*2 +
      movement.place.how_many_forms_mill()*4;
};

AIBehaviors.Smart.prototype.get_capture_value = function(piece) {
  return piece.place.occupied_adjacent_places_count();
};

