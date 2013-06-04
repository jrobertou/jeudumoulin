if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Proximity = function() {
  this.ai = null;
  AIBehaviors.Base.extend(AIBehaviors.Proximity);
};

AIBehaviors.Proximity.prototype.get_placement_value = function(place) {
  return place.occupied_adjacent_places_count();
};

AIBehaviors.Proximity.prototype.get_movement_value = function(movement) {
  return movement.place.occupied_adjacent_places_count() -
        movement.piece.place.occupied_adjacent_places_count();
};

AIBehaviors.Proximity.prototype.get_capture_value = function(piece) {
  return piece.place.occupied_adjacent_places_count();
};
