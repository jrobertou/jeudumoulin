if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Smart = function() {
  this.ai = null;
  AIBehaviors.Base.extend(AIBehaviors.Smart);
};

AIBehaviors.Smart.prototype.get_placement_value = function(place) {
  var piece = this.ai.player.pieces_to_play()[0];

  return place.occupied_adjacent_places_count() +
        (piece.would_form_mill(place) ? 10 : 0);
};

AIBehaviors.Smart.prototype.get_movement_value = function(movement) {
  return movement.place.occupied_adjacent_places_count() -
        movement.piece.place.occupied_adjacent_places_count() +
        (movement.piece.would_form_mill(movement.place) ? 10 : 0);
};

AIBehaviors.Smart.prototype.get_capture_value = function(piece) {
  return piece.place.occupied_adjacent_places_count();
};
